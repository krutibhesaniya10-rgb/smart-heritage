"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation } from "lucide-react"

// Plain HTML icon factory (no renderToStaticMarkup needed)
function makeDivIcon(svgPath: string, color: string) {
  return L.divIcon({
    html: `<div style="background:white;border-radius:50%;padding:6px;border:2px solid ${color};box-shadow:0 2px 4px rgba(0,0,0,0.2);color:${color};display:flex;align-items:center;justify-content:center;width:36px;height:36px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>
    </div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  })
}

// SVG paths for icons
const SVG_COFFEE = `<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>`
const SVG_UTENSILS = `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`
const SVG_HOTEL = `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>`
const SVG_CAMERA = `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>`
const SVG_MAPPIN = `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`

function getIconsByType() {
  return {
    cafe:       makeDivIcon(SVG_COFFEE,   '#d97706'),
    restaurant: makeDivIcon(SVG_UTENSILS, '#ea580c'),
    hotel:      makeDivIcon(SVG_HOTEL,    '#2563eb'),
    scenic:     makeDivIcon(SVG_CAMERA,   '#16a34a'),
    monument:   makeDivIcon(SVG_MAPPIN,   '#7c3aed'),
  } as Record<string, L.DivIcon>
}


// Fix for default Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const heritageIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function MapController({ center, zoom }: { center?: { lat: number, lng: number }, zoom?: number }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], zoom || map.getZoom(), { animate: true })
    }
  }, [center, zoom, map])
  return null
}

export default function LeafletMapContent({
  sites,
  selectedSite,
  userLocation,
  nearbyPlaces = [],
  onSiteSelect,
  center,
  zoom
}: {
  sites: any[]
  selectedSite: any
  userLocation: any
  nearbyPlaces?: any[]
  onSiteSelect: (site: any) => void
  center: { lat: number, lng: number }
  zoom: number
}) {
  // Icons are created inside the component to ensure they run client-side only
  const iconsByType = getIconsByType()

  const pulsingUserIcon = L.divIcon({
    html: `
      <div style="position:relative;width:20px;height:20px;">
        <div style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 0 2px #3b82f6;z-index:1;"></div>
        <div style="position:absolute;inset:-6px;background:#3b82f640;border-radius:50%;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
      </div>
      <style>@keyframes ping{75%,100%{transform:scale(2);opacity:0}}</style>
    `,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  })

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      zoomControl={false}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} zoom={zoom} />
      
      {/* Heritage site markers */}
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.position.lat, site.position.lng]}
          icon={heritageIcon}
          eventHandlers={{
            click: () => onSiteSelect(site)
          }}
        >
          {selectedSite?.id === site.id && (
            <Popup className="heritage-popup" autoPan>
              <div className="w-[220px]">
                <div className="relative h-28 w-full rounded-md overflow-hidden mb-2">
                  <Image src={site.image} alt={site.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{site.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{site.description}</p>
                <div className="flex gap-2">
                  <Link href={`/heritage/${site.id}`} className="flex-1">
                    <Button size="sm" className="w-full text-[10px] h-8">Details</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation ? `${userLocation.lat},${userLocation.lng}` : ''};${site.position.lat},${site.position.lng}`)
                    }}
                  >
                    <Navigation className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}

      {/* Nearby places markers (cafes, restaurants, etc.) */}
      {nearbyPlaces.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={iconsByType[place.type] || heritageIcon}
        >
          <Popup>
            <div className="p-2 min-w-[150px]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="capitalize text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                  {place.type}
                </span>
                <span className="text-xs font-bold">{place.name}</span>
              </div>
              <p className="text-[10px] text-gray-500">{place.address}</p>
              <div className="mt-1 font-bold text-xs text-yellow-600">★ {place.rating}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Live user location with pulsing marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={pulsingUserIcon}>
          <Popup>
            <div className="text-xs font-medium text-center px-2 py-1">📍 You are here</div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
