"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search as SearchIcon, MapPin, Navigation, List, Map as MapIcon, Compass, Share2, Ticket, Star, ChevronRight, Menu, X, Route, Filter, Eye, Activity, Camera, LocateFixed, Clock, Globe as GlobeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { calculateDistance, getTravelTime, heritagePlaces } from "@/lib/heritage-data"
import { fetchNearbyPlaces, type Place } from "@/lib/places-service"

const LeafletMap = dynamic(() => import('./leaflet-map-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
      <div className="w-10 h-10 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
    </div>
  )
})

const GlobeMap = dynamic(() => import('./globe-map-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#020617] animate-pulse">
      <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  )
})

// Map heritage-data places to the map site shape
const heritageSites = heritagePlaces.map(p => ({
  id: p.id,
  name: p.name,
  location: `${p.city}, ${p.state}`,
  image: p.image,
  images: p.images,
  rating: p.rating,
  timing: p.timings,
  ticketPrice: p.entryFee,
  description: p.description,
  position: { lat: p.lat, lng: p.lng },
  category: p.category,
  state: p.state,
  bestTime: p.bestTime,
  panorama: p.panorama,
}))

const STATES = ["All", "Gujarat", "Rajasthan"]
const CATEGORIES = ["All", "Temple", "Fort", "Palace", "Stepwell", "Archaeological Site", "Monument"]

// Place Autocomplete using Nominatim
function PlaceAutocomplete({ onPlaceSelect }: { onPlaceSelect: (place: { lat: number, lng: number, name: string }) => void }) {
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!inputValue.trim() || inputValue.length < 3) { setResults([]); return }
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&limit=5`)
        setResults(await res.json())
      } catch { setResults([]) }
    }, 500)
    return () => clearTimeout(t)
  }, [inputValue])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl">
        <SearchIcon className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search locations..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-[1000]">
          {results.map((r, i) => (
            <button key={i} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-0"
              onClick={() => { setInputValue(r.display_name); setResults([]); onPlaceSelect({ lat: parseFloat(r.lat), lng: parseFloat(r.lon), name: r.display_name }) }}>
              <div className="font-medium truncate">{r.display_name.split(',')[0]}</div>
              <div className="text-xs text-gray-500 truncate">{r.display_name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Distance badge shown on each card
function DistanceInfo({ origin, destination }: { origin: { lat: number, lng: number }, destination: { lat: number, lng: number } }) {
  const dist = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)
  return (
    <div className="mt-1.5 flex gap-3 text-xs font-medium text-heritage-clay">
      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />{dist.toFixed(0)} km</span>
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getTravelTime(dist)}</span>
    </div>
  )
}

export default function InteractiveMap() {
  const [selectedSite, setSelectedSite] = useState<typeof heritageSites[0] | null>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([])
  const [activeState, setActiveState] = useState("All")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [mapMode, setMapMode] = useState<"2d" | "3d">("3d")
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 23.5, lng: 73.5 })
  const [mapZoom, setMapZoom] = useState(6)
  const [isTracking, setIsTracking] = useState(false)
  const trackingIdRef = useRef<number | null>(null)

  // Auto-start location tracking
  useEffect(() => {
    if (!navigator.geolocation || trackingIdRef.current !== null) return
    setIsTracking(true)
    trackingIdRef.current = navigator.geolocation.watchPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setIsTracking(false),
      { enableHighAccuracy: true, maximumAge: 0 }
    )
    return () => {
      if (trackingIdRef.current !== null) {
        navigator.geolocation.clearWatch(trackingIdRef.current)
        trackingIdRef.current = null
      }
    }
  }, [])

  const toggleTracking = () => {
    if (!navigator.geolocation) return
    if (isTracking) {
      if (trackingIdRef.current !== null) { navigator.geolocation.clearWatch(trackingIdRef.current); trackingIdRef.current = null }
      setIsTracking(false)
    } else {
      setIsTracking(true)
      trackingIdRef.current = navigator.geolocation.watchPosition(
        pos => { const p = { lat: pos.coords.latitude, lng: pos.coords.longitude }; setUserLocation(p); setMapCenter(p); setMapZoom(13) },
        () => setIsTracking(false),
        { enableHighAccuracy: true, maximumAge: 0 }
      )
    }
  }

  // Fetch nearby places when a site is selected
  useEffect(() => {
    if (selectedSite) {
      fetchNearbyPlaces(selectedSite.position.lat, selectedSite.position.lng).then(setNearbyPlaces)
    } else {
      setNearbyPlaces([])
    }
  }, [selectedSite])

  // Filtered sites
  const filteredSites = heritageSites.filter(site => {
    const matchState = activeState === "All" || site.state === activeState
    const matchCat = activeCategory === "All" || site.category === activeCategory
    const matchSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchState && matchCat && matchSearch
  })

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
      {/* ── Sidebar ── */}
      <div className="w-full lg:w-96 bg-card border-r border-border flex flex-col">
        {/* Search & Filters */}
        <div className="p-4 border-b border-border space-y-3">
          <PlaceAutocomplete onPlaceSelect={place => { setMapCenter({ lat: place.lat, lng: place.lng }); setMapZoom(15) }} />

          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl">
            <SearchIcon className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Filter sites..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
          </div>

          {/* State filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            {STATES.map(s => (
              <button key={s} onClick={() => setActiveState(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeState === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {s}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Mobile view toggle */}
          <div className="flex lg:hidden gap-2">
            <Button variant={viewMode === "map" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setViewMode("map")}>
              <MapIcon className="w-4 h-4 mr-2" />Map
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4 mr-2" />List
            </Button>
          </div>
        </div>

        {/* Sites List */}
        <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${viewMode === "map" ? "hidden lg:block" : ""}`}>
          <p className="text-xs text-muted-foreground px-1">
            {filteredSites.length} of {heritageSites.length} sites shown
          </p>
          {filteredSites.map(site => (
            <Card key={site.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedSite?.id === site.id ? "ring-2 ring-primary shadow-md" : ""}`}
              onClick={() => { setSelectedSite(site); setMapCenter(site.position); setMapZoom(13) }}>
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={site.image} alt={site.name} fill className="object-cover" />
                    {site.panorama && (
                      <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 py-0.5 text-[9px] text-white font-medium flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5" />360°
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-1">{site.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{site.location}</span>
                    </div>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-heritage-clay/10 text-heritage-clay">{site.category}</span>

                    {userLocation && <DistanceInfo origin={userLocation} destination={site.position} />}

                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-0.5 text-xs">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{site.rating}
                      </span>
                      <span className="text-xs text-heritage-clay font-medium">{site.ticketPrice}</span>
                    </div>

                    <div className="flex gap-1 mt-2">
                      <Link href={`/heritage/${site.id}`} onClick={e => e.stopPropagation()}>
                        <Button size="sm" className="h-6 text-[10px] px-2">Details</Button>
                      </Link>
                      <Link href={`/gallery/${site.id}`} onClick={e => e.stopPropagation()}>
                        <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 border-[#d4c4a8] text-[#5e3417] hover:bg-[#e2d5c4]/30" asChild>
                          <div>
                            <Camera className="w-2.5 h-2.5 mr-1" />
                            Gallery
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredSites.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No sites match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Map Area ── */}
      <div className={`flex-1 relative ${viewMode === "list" ? "hidden lg:block" : ""}`}>
        {mapMode === "3d" ? (
          <GlobeMap
            sites={filteredSites}
            selectedSite={selectedSite}
            userLocation={userLocation}
            nearbyPlaces={nearbyPlaces}
            onSiteSelect={site => { setSelectedSite(site); setMapCenter(site.position) }}
            center={mapCenter}
            zoom={mapZoom}
          />
        ) : (
          <LeafletMap
            sites={filteredSites}
            selectedSite={selectedSite}
            userLocation={userLocation}
            nearbyPlaces={nearbyPlaces}
            onSiteSelect={site => { setSelectedSite(site); setMapCenter(site.position) }}
            center={mapCenter}
            zoom={mapZoom}
          />
        )}

        {/* Map Type Toggle */}
        <div className="absolute top-4 left-4 flex bg-white/95 backdrop-blur-sm p-1 rounded-full shadow-lg border border-gray-200 z-[400]">
          <button
            onClick={() => setMapMode("2d")}
            className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold rounded-full transition-all ${mapMode === "2d" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <MapIcon className="w-3.5 h-3.5" /> 2D Map
          </button>
          <button
            onClick={() => setMapMode("3d")}
            className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold rounded-full transition-all ${mapMode === "3d" ? "bg-blue-600 text-white shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            <GlobeIcon className="w-3.5 h-3.5" /> 3D Globe
          </button>
        </div>

        {/* Live tracking toggle */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
          <Button size="icon" variant="secondary"
            className={`shadow-lg transition-colors ${isTracking ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white hover:bg-white/90 text-primary"}`}
            onClick={toggleTracking} title={isTracking ? "Stop live tracking" : "Start live tracking"}>
            <LocateFixed className={`w-5 h-5 ${isTracking ? "animate-pulse" : ""}`} />
          </Button>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-[400]">
          <Button size="icon" variant="secondary" className="shadow-lg bg-white hover:bg-white/90 text-primary w-9 h-9"
            onClick={() => setMapZoom(z => Math.min(z + 1, 18))}>
            <span className="text-lg font-bold">+</span>
          </Button>
          <Button size="icon" variant="secondary" className="shadow-lg bg-white hover:bg-white/90 text-primary w-9 h-9"
            onClick={() => setMapZoom(z => Math.max(z - 1, 3))}>
            <span className="text-lg font-bold">-</span>
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 z-[400] text-[11px] border border-gray-200 shadow-md">
          <p className="font-semibold text-foreground mb-2">Map Legend</p>
          <div className="flex flex-col gap-1.5 text-muted-foreground">
            <span className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" className="h-4 w-auto" alt="" />
              Heritage Sites ({filteredSites.length})
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow" />
              Your Location
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />Cafés
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />Restaurants
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />Hotels
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />Scenic Spots
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
