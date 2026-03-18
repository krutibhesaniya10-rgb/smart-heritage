"use client"

import Image from "next/image"
import { MapPin, Star, Clock, Building2, Eye, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HeritagePlace } from "@/lib/heritage-data"

interface PlaceCardProps {
  place: HeritagePlace
  isSelected: boolean
  onToggle: (place: HeritagePlace) => void
  onView360: (place: HeritagePlace) => void
}

export default function PlaceCard({ place, isSelected, onToggle, onView360 }: PlaceCardProps) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-xl group relative border-2 ${
        isSelected ? "border-[#5e3417] bg-[#f9edd2]/30 scale-[1.02]" : "border-transparent hover:border-[#d4c4a8]"
      }`}
      onClick={() => onToggle(place)}
    >
      <div className="relative h-48 sm:h-56">
        <Image 
          src={place.image} 
          alt={place.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Selected Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-[#5e3417]/20 flex items-center justify-center backdrop-blur-[1px]">
            <div className="w-14 h-14 rounded-full bg-[#5e3417] text-white flex items-center justify-center shadow-2xl animate-in zoom-in-50 duration-300">
              <Check className="w-8 h-8" />
            </div>
          </div>
        )}

        {/* Buttons and Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#5e3417] uppercase tracking-wider shadow-sm">
            {place.category}
          </span>
          
          <button
            className="p-2.5 rounded-full bg-black/40 hover:bg-[#5e3417] text-white backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
            onClick={(e) => {
              e.stopPropagation()
              onView360(place)
            }}
            title="View 360° Panorama"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-white text-lg drop-shadow-md leading-tight">{place.name}</h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-white/90 text-xs flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              {place.city || place.region}
            </span>
            <span className="text-white/90 text-xs flex items-center gap-1 font-medium bg-black/20 px-2 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              {place.rating}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4 bg-white">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {place.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#8c623b]" />
              {place.duration}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-[#8c623b]" />
              {place.entryFee.split(' (')[0]}
            </span>
          </div>
          <div className="text-[10px] font-bold text-[#5e3417] uppercase tracking-tighter opacity-40">
            Heritage Site
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
