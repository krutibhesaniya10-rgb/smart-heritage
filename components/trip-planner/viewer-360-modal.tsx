"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  X, MapPin, Maximize2, Minimize2, Navigation,
  AlertTriangle, Loader2,
} from "lucide-react"
import { HeritagePlace } from "@/lib/heritage-data"

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds the Google Street View embed URL for a given lat/lng.
 * This is the documented embed format — no API key required.
 */
function buildStreetViewUrl(lat: number, lng: number): string {
  const params = new URLSearchParams({
    q:      "",
    layer:  "c",
    cbll:   `${lat},${lng}`,
    cbp:    "11,0,0,0,0",
    output: "svembed",
  })
  return `https://www.google.com/maps?${params.toString()}`
}

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────
interface Viewer360ModalProps {
  place:   HeritagePlace | null
  isOpen:  boolean
  onClose: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Viewer360Modal({ place, isOpen, onClose }: Viewer360ModalProps) {
  const [loading,      setLoading]      = useState(true)
  const [iframeError,  setIframeError]  = useState(false)
  const [mounted,      setMounted]      = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Guard: lat/lng must exist
  const hasCoords = !!place && typeof place.lat === "number" && typeof place.lng === "number"

  // Debug log in dev
  useEffect(() => {
    if (isOpen && place && process.env.NODE_ENV !== "production") {
      console.log("[360 Modal] opening for:", place.name)
      console.log("[360 Modal] lat:", place.lat, "/ lng:", place.lng)
      if (!hasCoords) console.warn("[360 Modal] ⚠ lat/lng missing on place:", place.id)
      else console.log("[360 Modal] Street View URL:", buildStreetViewUrl(place.lat, place.lng))
    }
  }, [isOpen, place, hasCoords])

  // Mount animation + reset state when a new place opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setIframeError(false)
      const t = setTimeout(() => setMounted(true), 30)

      // Safety fallback — if iframe never fires onLoad in 8 s, stop spinner
      fallbackRef.current = setTimeout(() => {
        setLoading(false)
      }, 8_000)

      return () => {
        clearTimeout(t)
      }
    } else {
      setMounted(false)
      setIsFullscreen(false)
      if (fallbackRef.current) clearTimeout(fallbackRef.current)
    }
  }, [isOpen, place?.id]) // re-run when place changes

  const handleIframeLoad = useCallback(() => {
    if (fallbackRef.current) clearTimeout(fallbackRef.current)
    setLoading(false)
    setIframeError(false)
    console.log("[360 Modal] iframe loaded ✓")
  }, [])

  const handleIframeError = useCallback(() => {
    if (fallbackRef.current) clearTimeout(fallbackRef.current)
    setLoading(false)
    setIframeError(true)
    console.error("[360 Modal] iframe failed to load")
  }, [])

  const toggleFullscreen = useCallback(() => setIsFullscreen(v => !v), [])

  // Don't render at all when closed
  if (!isOpen || !place) return null

  // Show a friendly message if coordinates are missing
  if (!hasCoords) {
    return (
      <div className="fixed inset-0 z-[9000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
        <div className="relative bg-[#0d0d0d] rounded-3xl p-10 flex flex-col items-center gap-5 max-w-sm text-center border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-white text-lg font-bold">Location Data Missing</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            GPS coordinates for <span className="text-white/70 font-semibold">{place.name}</span> are not available.
            Street View requires latitude and longitude.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const streetViewUrl = buildStreetViewUrl(place.lat, place.lng)

  return (
    <div
      className={`fixed inset-0 z-[9000] flex items-center justify-center transition-all duration-500 ${
        isFullscreen ? "p-0" : "p-3 md:p-8"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/92 backdrop-blur-xl transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal shell */}
      <div
        className={`relative bg-[#080808] border border-white/8 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}
          ${isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-6xl h-[88vh] rounded-3xl"}
        `}
      >

        {/* ── Header */}
        <div className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent pb-20 px-5 pt-5 pointer-events-none">
          <div className="flex items-start justify-between">
            {/* Left: title + badge */}
            <div className="pointer-events-auto">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[9px] font-extrabold uppercase tracking-[0.18em]">
                  <Navigation className="w-2.5 h-2.5" />
                  Google Street View
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/8 border border-white/12 text-white/40 text-[9px] font-bold uppercase tracking-widest">
                  <MapPin className="w-2.5 h-2.5" />
                  {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                </span>
              </div>
              <h2 className="text-white text-xl md:text-3xl font-black tracking-tight leading-tight drop-shadow-xl">
                {place.name}
              </h2>
              <p className="text-white/40 text-xs mt-1 font-medium">
                {place.category} · {place.city}, {place.state}
              </p>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/8 border border-white/15 text-white/60 hover:bg-white/15 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                title="Close"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Google Street View iframe
              key={place.id} forces a full iframe remount every time a
              different place is selected — prevents stale cached content */}
        <iframe
          key={place.id}
          src={streetViewUrl}
          title={`Google Street View — ${place.name}`}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {/* ── Loading spinner overlay */}
        {loading && !iframeError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080808] pointer-events-none">
            {/* Blurred thumbnail BG */}
            {place.image && (
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover opacity-[0.12] blur-2xl scale-110"
                />
              </div>
            )}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Google Maps–style spinner */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-[3px] border-blue-500/20 border-t-blue-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border border-blue-400/10 border-t-blue-400/50 animate-spin [animation-duration:1.8s] [animation-direction:reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-white/80 text-sm font-bold">Loading Street View</p>
                <p className="text-white/30 text-[11px] mt-1.5 tracking-widest uppercase">{place.name}</p>
                <p className="text-white/20 text-[10px] mt-1 font-mono">
                  {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Error overlay */}
        {iframeError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080808] p-6">
            {place.image && (
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover opacity-[0.08] blur-xl scale-110"
                />
              </div>
            )}
            <div className="relative z-10 flex flex-col items-center gap-5 text-center max-w-sm">
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Street View Unavailable</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Google Street View could not load for this location.
                  This area may not have Street View coverage yet.
                </p>
                <p className="text-white/25 text-xs mt-3 font-mono">
                  {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Back to Planner
              </button>
            </div>
          </div>
        )}

        {/* ── Bottom attribution bar */}
        {!loading && !iframeError && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/8 text-white/30 text-[10px] font-bold uppercase tracking-widest">
              <Navigation className="w-3 h-3" />
              <span>Drag to explore · Scroll to zoom</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
