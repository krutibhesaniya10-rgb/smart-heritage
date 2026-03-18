"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { HeritagePlace } from "@/lib/heritage-data"

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapController({ places }: { places: HeritagePlace[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(places.map(p => [p.lat, p.lng]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [places, map])

  return null
}

interface LeafletRouteMapContentProps {
  places: HeritagePlace[]
  selectedPlaceId?: string | null
  onPlaceClick?: (place: HeritagePlace) => void
  showRoute?: boolean
}

export default function LeafletRouteMapContent({ 
  places, 
  selectedPlaceId, 
  onPlaceClick, 
  showRoute 
}: LeafletRouteMapContentProps) {
  
  const createNumberedIcon = (number: number, isSelected: boolean) => {
    return L.divIcon({
      html: `
        <div class="relative flex flex-col items-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white transition-transform ${
            isSelected ? "bg-[#5d222c] scale-110" : "bg-[#5e3417]"
          }" style="color: white">
            ${number}
          </div>
          <div class="w-2 h-2 rotate-45 -mt-1 border-x-2 border-b-2 border-white ${
            isSelected ? "bg-[#5d222c]" : "bg-[#5e3417]"
          }"></div>
        </div>
      `,
      className: '',
      iconSize: [32, 42],
      iconAnchor: [16, 42]
    })
  }

  const routePath = places.map(p => [p.lat, p.lng] as [number, number])

  return (
    <MapContainer
      center={[24.0, 72.5]}
      zoom={7}
      zoomControl={false}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController places={places} />

      {showRoute && places.length >= 2 && (
        <>
          <Polyline 
            positions={routePath} 
            pathOptions={{ color: '#5e3417', weight: 6, opacity: 0.3, dashArray: '10, 10' }} 
          />
          <Polyline 
            positions={routePath} 
            pathOptions={{ color: '#8c623b', weight: 3, opacity: 0.9 }} 
          />
        </>
      )}

      {places.map((place, idx) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createNumberedIcon(idx + 1, selectedPlaceId === place.id)}
          eventHandlers={{
            click: () => onPlaceClick?.(place)
          }}
        >
          <Popup>
            <div className="p-1 min-w-[180px]">
              <h4 className="font-bold text-sm text-[#5e3417] mb-1">{place.name}</h4>
              <p className="text-xs text-gray-600 mb-1">{place.region} • {place.category}</p>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>⏱ {place.duration}</span>
                <span>💰 {place.entryFee}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
