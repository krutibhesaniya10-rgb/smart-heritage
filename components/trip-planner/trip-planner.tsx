"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  MapPin, Check, X, Calendar, Clock, Navigation, Car,
  ChevronRight, ChevronDown, ChevronUp, Route, Info, AlertCircle, Sparkles,
  Building2, Star, Eye, GripVertical, Plus, Minus,
  Coffee, Camera, MapPinned, Utensils, RefreshCcw,
  ArrowRight, Compass, LocateFixed, Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  heritagePlaces,
  nearbyRecommendations,
  generateItinerary,
  calculateDistance,
  getTravelTime,
  type HeritagePlace,
  type DayPlan,
  type NearbyRecommendation
} from "@/lib/heritage-data"
import RouteMap from "./route-map"
import PlaceCard from "./place-card"
import Viewer360Modal from "./viewer-360-modal"

const categories = ["All", "Temple", "Fort", "Palace", "Museum", "Monument", "Archaeological Site", "Stepwell"]
const regions = ["All", "Gujarat", "Rajasthan"]

const recTypeIcon: Record<string, React.ReactNode> = {
  cafe: <Coffee className="w-3.5 h-3.5" />,
  scenic: <Camera className="w-3.5 h-3.5" />,
  cultural: <Compass className="w-3.5 h-3.5" />,
  restaurant: <Utensils className="w-3.5 h-3.5" />,
}

const recTypeColor: Record<string, string> = {
  cafe: "bg-amber-100 text-amber-700 border-amber-200",
  scenic: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cultural: "bg-purple-100 text-purple-700 border-purple-200",
  restaurant: "bg-orange-100 text-orange-700 border-orange-200",
}

export default function TripPlanner() {
  // Selection state
  const [selectedPlaces, setSelectedPlaces] = useState<HeritagePlace[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeRegion, setActiveRegion] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Itinerary state
  const [showItinerary, setShowItinerary] = useState(false)
  const [itinerary, setItinerary] = useState<DayPlan[]>([])
  const [expandedDay, setExpandedDay] = useState<number | null>(1)
  const [selectedMapPlace, setSelectedMapPlace] = useState<string | null>(null)

  // 360Â° viewer state
  const [panoramaPlace, setPanoramaPlace] = useState<HeritagePlace | null>(null)

  // Drag reorder state
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  // Auto locate state
  const [isLocating, setIsLocating] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const addPlaceId = searchParams.get("addPlaceId")
    if (!addPlaceId) return

    const place = heritagePlaces.find((p) => p.id === addPlaceId)
    if (place) {
      setSelectedPlaces((prev) => (prev.some((p) => p.id === place.id) ? prev : [...prev, place]))
    }

    // Clean URL so the place is not re-added on refresh/back
    router.replace("/trip-planner")
  }, [router, searchParams])

  const handleAutoPlan = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        const userLocationPlace: HeritagePlace = {
          id: "user-loc",
          name: "Your Start Location",
          region: "Current Location",
          category: "Starting Point",
          image: "/images/virtual-tour.jpg", // placeholder
          images: [],
          state: "Current",
          city: "Location",
          bestTime: "Anytime",
          duration: "-",
          entryFee: "-",
          timings: "-",
          lat: userLat,
          lng: userLng,
          rating: 5,
          description: "Starting point for your auto-generated trip based on your current location.",
          history: "This is your auto-detected starting location."
        }

        const closestPlaces = [...heritagePlaces]
          .map(p => ({ p, dist: calculateDistance(userLat, userLng, p.lat, p.lng) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3)
          .map(item => item.p)

        const newPlaces = [userLocationPlace, ...closestPlaces]
        setSelectedPlaces(newPlaces)
        setIsLocating(false)

        setTimeout(() => {
          const plan = generateItinerary(newPlaces)
          setItinerary(plan)
          setShowItinerary(true)
          setExpandedDay(1)
        }, 100)
      },
      () => {
        setIsLocating(false)
        alert("Unable to retrieve your location. Please check browser permissions.")
      }
    )
  }

  // Filtering
  const filteredPlaces = heritagePlaces.filter(place => {
    const matchCategory = activeCategory === "All" || place.category === activeCategory
    const matchRegion = activeRegion === "All" || place.region === activeRegion
    const matchSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchRegion && matchSearch
  })

  const togglePlace = (place: HeritagePlace) => {
    if (selectedPlaces.find(p => p.id === place.id)) {
      setSelectedPlaces(prev => prev.filter(p => p.id !== place.id))
    } else {
      setSelectedPlaces(prev => [...prev, place])
    }
  }

  const isSelected = (id: string) => selectedPlaces.some(p => p.id === id)

  const handleGenerate = () => {
    if (selectedPlaces.length >= 3) {
      const plan = generateItinerary(selectedPlaces)
      setItinerary(plan)
      setShowItinerary(true)
      setExpandedDay(1)
    }
  }

  const handleRegenerate = () => {
    const plan = generateItinerary(selectedPlaces)
    setItinerary(plan)
    setExpandedDay(1)
  }

  const resetPlanner = () => {
    setSelectedPlaces([])
    setShowItinerary(false)
    setItinerary([])
    setExpandedDay(null)
    setSelectedMapPlace(null)
  }

  const addPlaceToTrip = (place: HeritagePlace) => {
    if (!selectedPlaces.find(p => p.id === place.id)) {
      setSelectedPlaces(prev => [...prev, place])
    }
  }

  const removePlaceFromTrip = (placeId: string) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== placeId))
    // Regenerate if in itinerary view
    if (showItinerary && selectedPlaces.length > 3) {
      setTimeout(() => {
        const newPlaces = selectedPlaces.filter(p => p.id !== placeId)
        const plan = generateItinerary(newPlaces)
        setItinerary(plan)
      }, 100)
    }
  }

  // Drag reorder
  const handleDragStart = (idx: number) => setDragIdx(idx)
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    const items = [...selectedPlaces]
    const dragged = items.splice(dragIdx, 1)[0]
    items.splice(idx, 0, dragged)
    setSelectedPlaces(items)
    setDragIdx(idx)
  }
  const handleDragEnd = () => setDragIdx(null)

  // Total stats
  const totalDistance = useMemo(() => {
    if (selectedPlaces.length < 2) return 0
    let total = 0
    for (let i = 1; i < selectedPlaces.length; i++) {
      total += calculateDistance(
        selectedPlaces[i - 1].lat, selectedPlaces[i - 1].lng,
        selectedPlaces[i].lat, selectedPlaces[i].lng
      )
    }
    return total
  }, [selectedPlaces])

  // Get all unique itinerary places for map
  const itineraryPlaces = useMemo(() => {
    return itinerary.flatMap(d => d.places)
  }, [itinerary])

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {!showItinerary ? (
            <>
              {/* ===== SELECTION VIEW ===== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Place Browser */}
                <div className="lg:col-span-2">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Select Heritage Places</h2>
                      <p className="text-muted-foreground mt-1">Choose 3 or more places for your trip</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAutoPlan}
                        disabled={isLocating}
                        className="border-[#5e3417] text-[#5e3417] hover:bg-[#5e3417] hover:text-white"
                      >
                        {isLocating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <LocateFixed className="w-4 h-4 mr-2" />}
                        <span className="hidden sm:inline">Auto-Plan Nearest</span>
                        <span className="sm:hidden">Auto-Plan</span>
                      </Button>
                      <span className={`hidden sm:inline-block px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedPlaces.length >= 3
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-[#f9edd2] text-[#5e3417] border-[#d4c4a8]"
                        }`}>
                        {selectedPlaces.length} Selected
                      </span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl mb-4">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search places, regionsâ€¦"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Filters */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      <span className="text-xs text-muted-foreground font-medium flex-shrink-0">Region:</span>
                      {regions.map(r => (
                        <button
                          key={r}
                          onClick={() => setActiveRegion(r)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeRegion === r
                            ? "bg-[#5e3417] text-white shadow-sm"
                            : "bg-white text-[#5e3417] border border-[#d4c4a8] hover:bg-[#f9edd2]"
                            }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      <span className="text-xs text-muted-foreground font-medium flex-shrink-0">Type:</span>
                      {categories.map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveCategory(c)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === c
                            ? "bg-[#5e3417] text-white shadow-sm"
                            : "bg-white text-[#5e3417] border border-[#d4c4a8] hover:bg-[#f9edd2]"
                            }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Places Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredPlaces.map(place => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        isSelected={isSelected(place.id)}
                        onToggle={togglePlace}
                        onView360={setPanoramaPlace}
                      />
                    ))}
                  </div>

                  {filteredPlaces.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>No places match your filters</p>
                    </div>
                  )}
                </div>

                {/* Right: Trip Builder Panel */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    <Card className="border-[#d4c4a8] bg-gradient-to-b from-[#fffef8] to-[#f9edd2]/30 shadow-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Route className="w-5 h-5 text-[#5e3417]" />
                          Trip Builder
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedPlaces.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <MapPinned className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">Click on places to add them to your trip</p>
                          </div>
                        ) : (
                          <>
                            {/* Draggable list */}
                            <div className="space-y-2">
                              {selectedPlaces.map((place, idx) => (
                                <div
                                  key={place.id}
                                  draggable
                                  onDragStart={() => handleDragStart(idx)}
                                  onDragOver={(e) => handleDragOver(e, idx)}
                                  onDragEnd={handleDragEnd}
                                  className={`flex items-center gap-2 p-2 rounded-lg bg-white border border-[#d4c4a8]/50 transition-all ${dragIdx === idx ? "opacity-50 scale-95" : ""
                                    }`}
                                >
                                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab flex-shrink-0" />
                                  <div className="w-6 h-6 rounded-full bg-[#5e3417] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={place.image} alt={place.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">{place.name}</p>
                                    <p className="text-[10px] text-muted-foreground">{place.region}</p>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      togglePlace(place)
                                    }}
                                    className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Travel info between consecutive */}
                            {selectedPlaces.length >= 2 && (
                              <div className="rounded-lg bg-[#f9edd2]/60 p-3 space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Total distance</span>
                                  <span className="font-semibold text-[#5e3417]">{totalDistance.toFixed(0)} km</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Est. travel time</span>
                                  <span className="font-semibold text-[#5e3417]">{getTravelTime(totalDistance)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Est. days</span>
                                  <span className="font-semibold text-[#5e3417]">{Math.ceil(selectedPlaces.length / 3)}</span>
                                </div>
                              </div>
                            )}

                            {/* Clear */}
                            <button
                              onClick={resetPlanner}
                              className="w-full text-center text-xs text-red-500 hover:text-red-600 transition-colors py-1"
                            >
                              Clear all selections
                            </button>
                          </>
                        )}

                        {/* Generate button */}
                        <Button
                          size="lg"
                          onClick={handleGenerate}
                          disabled={selectedPlaces.length < 3}
                          className="w-full bg-[#5e3417] hover:bg-[#8c623b] text-white rounded-xl disabled:opacity-50 transition-all hover:shadow-lg"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Itinerary
                        </Button>

                        {selectedPlaces.length > 0 && selectedPlaces.length < 3 && (
                          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Select {3 - selectedPlaces.length} more place{3 - selectedPlaces.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Mini map preview */}
                    {selectedPlaces.length >= 2 && (
                      <Card className="border-[#d4c4a8] overflow-hidden">
                        <CardContent className="p-0">
                          <RouteMap places={selectedPlaces} showRoute height="200px" />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* ===== ITINERARY VIEW ===== */}
              <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#5e3417] flex items-center justify-center">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      Your Trip Itinerary
                    </h2>
                    <p className="text-muted-foreground mt-1 ml-[52px]">
                      {selectedPlaces.length} places â€¢ {itinerary.length} day{itinerary.length > 1 ? 's' : ''} â€¢ Optimized route
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={handleRegenerate}
                      className="border-[#d4c4a8] text-[#5e3417]"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Re-optimize
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowItinerary(false)}
                      className="border-[#d4c4a8] text-[#5e3417]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Places
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetPlanner}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      New Trip
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* Left: Itinerary Timeline (3 cols) */}
                  <div className="lg:col-span-3 space-y-4">
                    {itinerary.map((day) => (
                      <Card key={day.day} className="overflow-hidden border-[#d4c4a8] transition-all">
                        {/* Day Header */}
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          className="w-full"
                        >
                          <CardHeader className="bg-gradient-to-r from-[#5e3417] to-[#8c623b] text-white py-4 hover:from-[#4a2a12] transition-colors">
                            <CardTitle className="flex items-center justify-between text-base">
                              <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Day {day.day}
                                {day.date && <span className="text-white/70 text-sm font-normal">â€¢ {day.date}</span>}
                              </span>
                              <div className="flex items-center gap-4 text-sm font-normal">
                                <span className="flex items-center gap-1">
                                  <Navigation className="w-4 h-4" />
                                  {day.totalDistance}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Car className="w-4 h-4" />
                                  {day.totalTravelTime}
                                </span>
                                {expandedDay === day.day
                                  ? <ChevronUp className="w-5 h-5" />
                                  : <ChevronDown className="w-5 h-5" />
                                }
                              </div>
                            </CardTitle>
                          </CardHeader>
                        </button>

                        {/* Day Content */}
                        {expandedDay === day.day && (
                          <CardContent className="p-0 animate-fade-in">
                            {day.places.map((place, idx) => (
                              <div key={place.id}>
                                {/* Travel segment */}
                                {place.travelTimeFromPrev && (
                                  <div className="flex items-center justify-center py-3 bg-[#f9edd2]/50 border-b border-[#d4c4a8]">
                                    <div className="flex items-center gap-2 text-sm text-[#8c623b]">
                                      <Car className="w-4 h-4" />
                                      <span className="font-medium">{place.distanceFromPrev}</span>
                                      <ArrowRight className="w-3 h-3" />
                                      <Clock className="w-4 h-4" />
                                      <span className="font-medium">{place.travelTimeFromPrev}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Place card */}
                                <div
                                  className={`p-4 border-b border-[#d4c4a8] last:border-0 transition-colors ${selectedMapPlace === place.id ? "bg-[#f9edd2]/40" : "hover:bg-[#f9edd2]/20"
                                    }`}
                                  onClick={() => setSelectedMapPlace(place.id)}
                                >
                                  <div className="flex gap-4">
                                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 group">
                                      <Image src={place.image} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                      <div className="absolute top-1 left-1 w-7 h-7 rounded-full bg-[#5e3417] text-white text-xs font-bold flex items-center justify-center">
                                        {idx + 1}
                                      </div>
                                      {place.panorama && (
                                        <button
                                          className="absolute bottom-1 right-1 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-medium flex items-center gap-1.5 hover:bg-[#5e3417] transition-all"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setPanoramaPlace(place)
                                          }}
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                          360Â°
                                        </button>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <h4 className="font-bold text-foreground mb-0.5">{place.name}</h4>
                                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {place.region} â€¢ {place.category}
                                          </p>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            removePlaceFromTrip(place.id)
                                          }}
                                        >
                                          <Minus className="w-4 h-4" />
                                        </Button>
                                      </div>

                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{place.history || place.description}</p>

                                      <div className="flex flex-wrap gap-3 text-xs mt-2">
                                        <span className="flex items-center gap-1 text-[#5e3417]">
                                          <Clock className="w-3 h-3" />
                                          {place.timings}
                                        </span>
                                        <span className="flex items-center gap-1 text-[#5e3417]">
                                          <Building2 className="w-3 h-3" />
                                          {place.entryFee}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-600">
                                          <Star className="w-3 h-3 fill-yellow-400" />
                                          {place.rating}
                                        </span>
                                      </div>

                                      {/* Image gallery mini */}
                                      {place.images && place.images.length > 1 && (
                                        <div className="flex gap-1.5 mt-2">
                                          {place.images.slice(0, 3).map((img, i) => (
                                            <div key={i} className="relative w-12 h-12 rounded-md overflow-hidden">
                                              <Image src={img} alt="" fill className="object-cover" />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Nearby recommendations */}
                                  {place.recommendations && place.recommendations.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-[#d4c4a8]/50">
                                      <p className="text-[10px] font-semibold text-[#8c623b] uppercase tracking-wider mb-2">
                                        ðŸ“ Nearby Suggestions
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {place.recommendations.map(rec => (
                                          <div
                                            key={rec.id}
                                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium ${recTypeColor[rec.type]}`}
                                          >
                                            {recTypeIcon[rec.type]}
                                            {rec.name}
                                            <Star className="w-2.5 h-2.5 fill-current opacity-60" />
                                            <span className="opacity-60">{rec.rating}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>

                  {/* Right: Map + Tips (2 cols) */}
                  <div className="lg:col-span-2">
                    <div className="sticky top-24 space-y-4">
                      {/* Route Map */}
                      <Card className="border-[#d4c4a8] overflow-hidden">
                        <CardHeader className="py-3 bg-[#f9edd2]/50 border-b border-[#d4c4a8]">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#5e3417]" />
                            Route Map
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <RouteMap
                            places={itineraryPlaces}
                            selectedPlaceId={selectedMapPlace}
                            onPlaceClick={(p) => setSelectedMapPlace(p.id)}
                            showRoute
                            height="350px"
                          />
                        </CardContent>
                      </Card>

                      {/* Quick add places */}
                      <Card className="border-[#d4c4a8]">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#5e3417]" />
                            Add More Places
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-48 overflow-y-auto space-y-2 pt-0">
                          {heritagePlaces.filter(p => !selectedPlaces.find(s => s.id === p.id)).map(place => (
                            <button
                              key={place.id}
                              onClick={() => {
                                addPlaceToTrip(place)
                                handleRegenerate()
                              }}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#f9edd2]/50 transition-colors text-left"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={place.image} alt={place.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">{place.name}</p>
                                <p className="text-[10px] text-muted-foreground">{place.region}</p>
                              </div>
                              <Plus className="w-4 h-4 text-[#5e3417]" />
                            </button>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Tips */}
                      <Card className="bg-emerald-50/70 border-emerald-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                              <Info className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-emerald-800 text-sm">Travel Tips</h3>
                              <ul className="text-emerald-700 mt-1.5 space-y-1 text-xs">
                                <li>ðŸŒ… Start early to avoid heat and crowds</li>
                                <li>ðŸ’§ Carry water and comfortable footwear</li>
                                <li>ðŸ“± Download offline maps for rural areas</li>
                                <li>ðŸŽ« Book tickets online to save time</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 360Â° Immersive Viewer Modal */}
      <Viewer360Modal
        place={panoramaPlace}
        isOpen={!!panoramaPlace}
        onClose={() => setPanoramaPlace(null)}
      />
    </>
  )
}