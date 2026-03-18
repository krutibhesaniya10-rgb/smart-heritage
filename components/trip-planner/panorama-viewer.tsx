"use client"

import { useState, useRef, useEffect } from "react"
import { X, Maximize2, Minimize2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PanoramaViewerProps {
  lat: number
  lng: number
  title: string
  isOpen: boolean
  onClose: () => void
}

export default function PanoramaViewer({ lat, lng, title, isOpen, onClose }: PanoramaViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [status, setStatus] = useState<"loading" | "ready">("loading")

  useEffect(() => {
    if (isOpen) {
      setStatus("loading")
    }
  }, [isOpen, lat, lng])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center ${isFullscreen ? '' : 'p-4 md:p-8'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Viewer */}
      <div
        className={`relative bg-black overflow-hidden shadow-2xl flex flex-col ${
          isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl h-[80vh] rounded-2xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#5e3417] to-[#8c623b] text-white z-10 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate">{title}</h3>
              <p className="text-white/60 text-xs">360° Street View • Drag to look around</p>
            </div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/20 w-8 h-8"
              onClick={() => setIsFullscreen(f => !f)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/20 w-8 h-8"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mapillary Frame renders here */}
        <div className="flex-1 w-full relative">
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 gap-4 bg-[#1a1a1a] z-10 pointer-events-none">
              <div className="w-16 h-16 border-4 border-white/10 border-t-[#8c623b] rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-sm font-medium text-white/80">Loading Mapillary 360° View</p>
                <p className="text-xs text-white/40 mt-1">Fetching panoramas near {title}…</p>
              </div>
            </div>
          )}

          <iframe
            src={`https://www.mapillary.com/app/?lat=${lat}&lng=${lng}&z=17&focus=map&menu=false`}
            className="w-full h-full border-0"
            allowFullScreen
            onLoad={() => setStatus("ready")}
          />
        </div>
      </div>
    </div>
  )
}
