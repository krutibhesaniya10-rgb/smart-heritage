"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Play, Pause, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const tourSpots = [
  {
    id: 1,
    name: "Temple Main Hall",
    image: "/images/heritage-1.jpg",
    description: "The grand entrance hall features intricate carvings depicting ancient legends and sacred rituals.",
    hotspots: [
      { x: 30, y: 40, label: "Sacred Altar" },
      { x: 70, y: 60, label: "Ancient Murals" },
    ],
  },
  {
    id: 2,
    name: "Royal Court",
    image: "/images/heritage-3.jpg",
    description: "The magnificent royal court where kings held audiences and made historic decisions.",
    hotspots: [
      { x: 50, y: 30, label: "Throne Platform" },
      { x: 20, y: 50, label: "Minister's Gallery" },
    ],
  },
  {
    id: 3,
    name: "Fortress Tower",
    image: "/images/heritage-2.jpg",
    description: "The strategic watchtower offering panoramic views of the surrounding landscape.",
    hotspots: [
      { x: 40, y: 45, label: "Observation Deck" },
      { x: 75, y: 55, label: "Signal Room" },
    ],
  },
  {
    id: 4,
    name: "Heritage Gallery",
    image: "/images/virtual-tour.jpg",
    description: "A stunning collection of artifacts and artwork spanning centuries of cultural heritage.",
    hotspots: [
      { x: 35, y: 50, label: "Artifact Display" },
      { x: 65, y: 40, label: "Ceiling Artwork" },
    ],
  },
]

export default function VirtualTourViewer() {
  const [currentSpot, setCurrentSpot] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, rotation: 0 })
  const [showInfo, setShowInfo] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const spot = tourSpots[currentSpot]

  // Auto-play rotation
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setRotation((r) => (r + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsPlaying(false)
    setDragStart({ x: e.clientX, rotation })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStart.x
    setRotation(dragStart.rotation + delta * 0.3)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const goToNext = () => {
    setCurrentSpot((s) => (s + 1) % tourSpots.length)
    setRotation(0)
    setZoom(1)
  }

  const goToPrevious = () => {
    setCurrentSpot((s) => (s - 1 + tourSpots.length) % tourSpots.length)
    setRotation(0)
    setZoom(1)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div 
          ref={containerRef}
          className={`relative rounded-2xl overflow-hidden bg-primary ${isFullscreen ? "h-screen" : "aspect-video"}`}
        >
          {/* 360 Image Viewer */}
          <div
            className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 transition-transform duration-75"
              style={{
                transform: `scale(${zoom}) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={spot.image}
                alt={spot.name}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30 pointer-events-none" />
          </div>

          {/* Hotspots */}
          {spot.hotspots.map((hotspot, index) => (
            <button
              key={index}
              className="absolute w-6 h-6 rounded-full bg-heritage-clay animate-pulse hover:animate-none hover:scale-125 transition-transform z-10"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              title={hotspot.label}
            >
              <span className="sr-only">{hotspot.label}</span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-card text-foreground text-xs rounded opacity-0 hover:opacity-100 transition-opacity">
                {hotspot.label}
              </span>
            </button>
          ))}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            <div className="glass-dark rounded-full p-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={goToNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="glass-dark rounded-full p-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => { setRotation(0); setZoom(1); }}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Spot Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {tourSpots.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSpot(index); setRotation(0); setZoom(1); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSpot ? "bg-primary-foreground w-4" : "bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Info Panel */}
          <div className="absolute top-4 left-4 z-20">
            <Button
              variant="ghost"
              size="icon"
              className="glass-dark text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>

          {showInfo && (
            <Card className="absolute top-4 left-16 max-w-xs animate-fade-in z-20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{spot.name}</h3>
                <p className="text-sm text-muted-foreground">{spot.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Drag to explore • Click hotspots for details
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tour Title */}
          <div className="absolute top-4 right-4 z-20">
            <div className="glass-dark rounded-lg px-4 py-2">
              <p className="text-primary-foreground text-sm font-medium">
                {currentSpot + 1} / {tourSpots.length}: {spot.name}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {tourSpots.map((tourSpot, index) => (
            <button
              key={tourSpot.id}
              onClick={() => { setCurrentSpot(index); setRotation(0); setZoom(1); }}
              className={`relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden transition-all ${
                index === currentSpot ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={tourSpot.image}
                alt={tourSpot.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/30" />
              <span className="absolute bottom-2 left-2 text-xs text-primary-foreground font-medium">
                {tourSpot.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
