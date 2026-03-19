"use client"

import Image from "next/image"
import { MapPin, Star, Clock, Building2, Eye, Check, Maximize } from "lucide-react"
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
      className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl group relative border-2 ${
        isSelected
          ? "border-[#5e3417] bg-[#f9edd2]/30 shadow-[0_0_0_4px_rgba(94,52,23,0.15)]"
          : "border-transparent hover:border-[#d4c4a8] hover:-translate-y-0.5"
      }`}
      onClick={() => onToggle(place)}
    >
      {/* ── Image + Overlay Area */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute inset-0 bg-[#5e3417]/25 flex items-center justify-center backdrop-blur-[1px]">
            <div className="w-14 h-14 rounded-full bg-[#5e3417] text-white flex items-center justify-center shadow-2xl ring-4 ring-white/20">
              <Check className="w-8 h-8" />
            </div>
          </div>
        )}

        {/* Top row: category badge + 360 button */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Category badge */}
          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15">
            {place.category}
          </span>

          {/* Street View 360° button — always available via lat/lng */}
          <button
            type="button"
            aria-label={`Open Street View for ${place.name}`}
            suppressHydrationWarning
            className="group/btn flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/15 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-250 hover:bg-blue-600 hover:border-blue-500 hover:scale-105 hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] active:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              onView360(place)
            }}
            title={`Open Street View for ${place.name}`}
          >
            <Maximize className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-300" />
            View 360°
          </button>
        </div>

        {/* Bottom: name + location */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-base leading-tight drop-shadow-lg line-clamp-2 mb-1.5">
            {place.name}
          </h3>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-white/85 text-[11px] flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
              {place.city}, {place.state}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-white/85 bg-black/30 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {place.rating}
            </span>
          </div>
        </div>
      </div>

      {/* ── Info Area */}
      <CardContent className="p-4 bg-white">
        <p className="text-[12px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {place.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#8c623b]" />
              {place.duration}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-[#8c623b]" />
              {place.entryFee.split(" (")[0]}
            </span>
          </div>

          {/* Street View shortcut in footer */}
          <button
            type="button"
            aria-label="Open Street View"
            className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              onView360(place)
            }}
            title="Open Street View"
          >
            <Eye className="w-3 h-3" />
            360°
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
