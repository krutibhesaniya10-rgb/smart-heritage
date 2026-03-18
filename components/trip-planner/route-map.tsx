"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { HeritagePlace } from "@/lib/heritage-data"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, LocateFixed } from "lucide-react"

const LeafletRouteMap = dynamic(() => import('./leaflet-route-map-content'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
      <div className="w-10 h-10 border-4 border-[#5e3417] rounded-full border-t-transparent animate-spin"></div>
    </div>
  )
})

interface RouteMapProps {
  places: HeritagePlace[]
  selectedPlaceId?: string | null
  onPlaceClick?: (place: HeritagePlace) => void
  showRoute?: boolean
  height?: string
}

export default function RouteMap({ 
  places, 
  selectedPlaceId, 
  onPlaceClick, 
  showRoute = true, 
  height = "400px" 
}: RouteMapProps) {
  const [zoom, setZoom] = useState(7)
  const [center, setCenter] = useState<{lat: number, lng: number} | undefined>(undefined)

  return (
    <div className="rounded-xl overflow-hidden border border-[#d4c4a8] relative" style={{ height }}>
      <LeafletRouteMap
        places={places}
        selectedPlaceId={selectedPlaceId}
        onPlaceClick={onPlaceClick}
        showRoute={showRoute}
      />

      {/* Custom controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
        <Button
          size="icon"
          className="bg-white hover:bg-gray-50 text-[#5e3417] shadow-lg w-9 h-9"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(pos => {
                // Leaflet map will handle centering via props if we managed state here, 
                // but for simplicity in this specific view we let the click center manually
                // or we could add a ref and call panTo if needed.
                // For now, we'll just set center state to trigger a re-render in LeafletRouteMap
                setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                setZoom(10)
              })
            }
          }}
        >
          <LocateFixed className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-[400]">
        <Button
          size="icon"
          className="bg-white hover:bg-gray-50 text-[#5e3417] shadow-lg w-9 h-9"
          onClick={() => setZoom(z => Math.min(z + 1, 18))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          className="bg-white hover:bg-gray-50 text-[#5e3417] shadow-lg w-9 h-9"
          onClick={() => setZoom(z => Math.max(z - 1, 3))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-[#5e3417] z-[400] border border-[#d4c4a8]">
        <p className="font-semibold">Route Preview</p>
        <p className="text-[#8c623b]">{places.length} stops</p>
      </div>
    </div>
  )
}

