"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Navigation, X, Camera, RefreshCw, RefreshCcw, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0f1c] text-white">
      <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mb-4"></div>
      <p className="text-sm font-medium text-blue-200">Initializing 3D Globe...</p>
    </div>
  )
})

interface Site {
  id: string
  name: string
  description: string
  image: string
  position: { lat: number; lng: number }
  [key: string]: any
}

interface NearbyPlace {
  id: string
  lat: number
  lng: number
  type: string
  name: string
  address: string
  rating: number
}

interface GlobeMapContentProps {
  sites: Site[]
  selectedSite: Site | null
  userLocation: { lat: number; lng: number } | null
  nearbyPlaces?: NearbyPlace[]
  onSiteSelect: (site: Site) => void
  center: { lat: number; lng: number }
  zoom: number // Map zoom corresponds loosely to globe zoom
}

export default function GlobeMapContent({
  sites,
  selectedSite,
  userLocation,
  nearbyPlaces = [],
  onSiteSelect,
  center,
  zoom,
}: GlobeMapContentProps) {
  const globeRef = useRef<any>(null)
  const [globeReady, setGlobeReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Interaction tracking
  const [isAutoRotateEnabled, setIsAutoRotateEnabled] = useState(true)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [screenCoords, setScreenCoords] = useState<{ x: number, y: number } | null>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Active popup site (for clicking a marker directly on globe popup)
  const [activePopup, setActivePopup] = useState<Site | null>(selectedSite)
  const [showPopupCard, setShowPopupCard] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActivePopup(selectedSite)
    if (!selectedSite) setShowPopupCard(false)
  }, [selectedSite])

  // Monitor popup position to ensure it stays in viewport
  useEffect(() => {
    if (activePopup && popupRef.current && containerRef.current) {
      const popupRect = popupRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      // If the top of the popup is above the container top, flip to bottom
      if (popupRect.top < containerRect.top + 20) {
        setPopupPosition("bottom")
      } else {
        setPopupPosition("top")
      }
    }
  }, [activePopup])

  // Coordinate sync tool
  const syncCoords = useCallback(() => {
    if (activePopup && globeRef.current) {
      const coords = globeRef.current.getScreenCoords(activePopup.position.lat, activePopup.position.lng)
      setScreenCoords(coords)
    }
  }, [activePopup])

  // Inactivity timeout handler
  const handleInteraction = useCallback(() => {
    setIsInteracting(true)
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current)
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, 5000)
    syncCoords() // also sync on manual pan
  }, [syncCoords])

  // Handle Resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Auto-rotate effect and programmatic center
  useEffect(() => {
    if (!globeRef.current || !globeReady) return

    // Setup controls for auto-rotate
    const controls = globeRef.current.controls()
    if (controls) {
      controls.autoRotate = isAutoRotateEnabled && !activePopup && !selectedSite && !isInteracting
      controls.autoRotateSpeed = 0.8

      // Configuration for zoom & pan overrides
      controls.enableZoom = !activePopup // Lock zoom while viewing popup
      controls.enableRotate = !activePopup // Lock rotation while viewing popup
      controls.enablePan = false // strict globe pan logic
      // limit zoom
      controls.minDistance = 105 // City-level detail
      controls.maxDistance = 500 // World view
    }

    // Set center position
    if (center && selectedSite) {
      const altitude = Math.max(0.05, 2.5 - (zoom * 0.15))
      const targetAlt = activePopup ? 0.3 : altitude

      // SMART ADJUSTMENT: Target slightly north of the marker to push it south (lower) on screen
      // Degree offset scales roughly with zoom level (closer = smaller degree offset)
      const latOffset = activePopup ? 8.5 : 0 // offset in degrees

      setIsTransitioning(true)
      setShowPopupCard(false) // Hide while moving

      globeRef.current.pointOfView({
        lat: center.lat + latOffset,
        lng: center.lng,
        altitude: targetAlt
      }, 1500)

      setTimeout(() => {
        setIsTransitioning(false)
        syncCoords()
        setShowPopupCard(true) // Show only after cameras is settled
      }, 1600)
    }
  }, [center, zoom, selectedSite, globeReady, activePopup, isAutoRotateEnabled, isInteracting, syncCoords])

  const resetGlobe = () => {
    if (!globeRef.current) return
    setIsTransitioning(true)
    globeRef.current.pointOfView({ lat: 23.5, lng: 73.5, altitude: 2.5 }, 2000)
    setTimeout(() => setIsTransitioning(false), 2000)
    setActivePopup(null)
    setPopupPosition("top") // reset to top
  }

  // Combine data for markers using html elements
  const allMarkers = useMemo(() => {
    const elements: any[] = []

    // Heritage Sites
    sites.forEach(site => {
      elements.push({
        lat: site.position.lat,
        lng: site.position.lng,
        type: 'heritage',
        data: site,
        size: selectedSite?.id === site.id ? 30 : 20,
        color: '#fbbf24' // amber
      })
    })

    // User Location
    if (userLocation) {
      elements.push({
        lat: userLocation.lat,
        lng: userLocation.lng,
        type: 'user',
        data: null,
        size: 20,
        color: '#3b82f6' // blue
      })
    }

    // Nearby Places (Clustering substitute: hide at low zooms)
    // Only show nearby POIs and detailed markers when zoomed in (i.e., a site is selected)
    if (activePopup || selectedSite) {
      nearbyPlaces.forEach(place => {
        let color = '#737373' // default gray
        if (place.type === 'cafe') color = '#d97706'
        else if (place.type === 'restaurant') color = '#ea580c'
        else if (place.type === 'hotel') color = '#2563eb'
        else if (place.type === 'scenic') color = '#16a34a'

        elements.push({
          lat: place.lat,
          lng: place.lng,
          type: place.type,
          data: place,
          size: 14,
          color: color
        })
      })
    }

    return elements
  }, [sites, selectedSite, userLocation, nearbyPlaces])

  // Custom DOM element generator for markers
  const createHtmlElement = (d: any) => {
    const el = document.createElement('div')

    if (d.type === 'user') {
      el.innerHTML = `
        <div style="position:relative;width:24px;height:24px;transform:translate(-50%,-50%);cursor:pointer;">
          <div style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(59,130,246,0.8);z-index:1;"></div>
          <div style="position:absolute;inset:-8px;background:rgba(59,130,246,0.4);border-radius:50%;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
        </div>
      `
      return el
    }

    if (d.type === 'heritage') {
      const isSelected = selectedSite?.id === d.data.id || activePopup?.id === d.data.id
      el.style.transition = 'all 0.3s ease'
      el.style.zIndex = isSelected ? '100' : '10'
      el.innerHTML = `
        <div style="
          width: ${isSelected ? 36 : 28}px; 
          height: ${isSelected ? 36 : 28}px; 
          background: ${isSelected ? '#5e3417' : '#fff'};
          border: 2px solid ${isSelected ? '#fff' : '#5e3417'};
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? 20 : 14}" height="${isSelected ? 20 : 14}" viewBox="0 0 24 24" fill="${isSelected ? 'white' : '#5e3417'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `
      el.onclick = () => {
        onSiteSelect(d.data)
        setActivePopup(d.data)
      }
      return el
    }

    // Nearby places
    el.innerHTML = `
      <div style="
        width: 16px;
        height: 16px;
        background: ${d.color};
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
        cursor: pointer;
      "></div>
    `
    // TBD Tooltips for nearby places
    return el
  }

  // Removed arcs data to avoid confusing background highlights

  return (
    <div
      className={`w-full h-full relative bg-[#020617] overflow-hidden ${isTransitioning ? "pointer-events-none" : ""}`}
      ref={containerRef}
      onPointerDown={handleInteraction}
      onWheel={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* UI Overlay Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[300]">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full"
          onClick={() => setIsAutoRotateEnabled(!isAutoRotateEnabled)}
          title={isAutoRotateEnabled ? "Pause Rotation" : "Resume Rotation"}
        >
          {isAutoRotateEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full"
          onClick={resetGlobe}
          title="Reset Globe View"
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>

      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}

          onGlobeReady={() => setGlobeReady(true)}
          // Update cords on user manual interaction
          onZoom={() => syncCoords()}

          // Using a stunning night/day Earth resolution
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

          // Atmosphere
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}

          htmlElementsData={allMarkers}
          htmlElement={createHtmlElement}
        />
      )}

      {/* Background Focus Overlay */}
      {showPopupCard && activePopup && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[150] transition-opacity duration-500 animate-in fade-in"
          onClick={() => { setActivePopup(null); setShowPopupCard(false) }}
        />
      )}

      {/* HTML OVERLAY for Selected Site Popup */}
      {showPopupCard && activePopup && screenCoords && (
        <div
          ref={popupRef}
          style={{
            left: `${screenCoords.x}px`,
            top: `${screenCoords.y}px`,
          }}
          className="absolute z-[200] transform -translate-x-1/2 -translate-y-[calc(100%+24px)] animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto transition-all"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-[300px] max-h-[70vh] overflow-hidden flex flex-col">
            <div className="relative h-36 w-full">
              <Image src={activePopup.image} alt={activePopup.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <button
                onClick={(e) => { e.stopPropagation(); setActivePopup(null) }}
                className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Overlay Text on Image */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-bold text-white text-base leading-tight drop-shadow-md">{activePopup.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md shadow-sm">
                    ★ {activePopup.rating || '4.5'}
                  </span>
                  <span className="text-[10px] text-white/90 font-medium drop-shadow-sm truncate">
                    📍 {activePopup.location || 'Heritage Site'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activePopup.description}
              </p>

              {activePopup.timing && (
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-slate-50 p-1.5 rounded-md border border-slate-100">
                  <span className="font-semibold text-slate-700">🕒 Timing:</span>
                  <span className="truncate">{activePopup.timing}</span>
                </div>
              )}

              <div className="flex gap-2 mt-1">
                <Link href={`/heritage/${activePopup.id}`} className="flex-1">
                  <Button size="sm" className="w-full text-xs font-semibold h-9 bg-primary hover:bg-primary/90 shadow-sm transition-all focus:ring-2 ring-offset-1 ring-primary/50">
                    View Details
                  </Button>
                </Link>
                <Link href={`/gallery/${activePopup.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-[10px] h-8 text-primary border-primary/20 hover:bg-primary/10">
                    <Camera className="w-3 h-3 mr-1" />
                    Gallery
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 flex-shrink-0 text-primary border-primary/20 hover:bg-primary/10"
                  title="Plan Route"
                  onClick={() => {
                    const params = userLocation
                      ? `${userLocation.lat},${userLocation.lng};${activePopup.position.lat},${activePopup.position.lng}`
                      : `${activePopup.position.lat},${activePopup.position.lng}`
                    window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${params}`)
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Arrow pointing to marker (always pointing down since we shift the camera) */}
          <div className="w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-sm"></div>
        </div>
      )}

      {/* Embedded interactive styling / animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ping {
          75%, 100% { transform: scale(3) translate(-16%, -16%); opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4c4a8;
          border-radius: 10px;
        }
      `}} />
    </div>
  )
}
