"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { X, Maximize2, Minimize2, PauseCircle, PlayCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PanoramicViewerProps {
  imageUrl: string
  title: string
  isOpen: boolean
  onClose: () => void
  autoRotate?: boolean
}

export default function PanoramicViewer({ imageUrl, title, isOpen, onClose, autoRotate = true }: PanoramicViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
  
  // Refs for Three.js objects to prevent re-creation
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    setLoading(true)
    setError(null)

    // 1. Setup Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Setup Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 0.1) // Minimal offset to allow controls to work
    cameraRef.current = camera

    // 3. Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 4. Setup Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = -0.5 // Invert to feel like dragging the world
    controls.enableZoom = true
    controls.autoRotate = isAutoRotating
    controls.autoRotateSpeed = 0.5
    controlsRef.current = controls

    // 5. Create Sphere for Panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // Invert geometry to see from inside

    const loader = new THREE.TextureLoader()
    loader.crossOrigin = "anonymous"

    loader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)
        setLoading(false)
      },
      undefined,
      (err) => {
        console.error("Texture Load Error:", err)
        setError("Failed to load 360 panoramic image. Please check your connection or try another site.")
        setLoading(false)
      }
    )

    // 6. Animation Loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      if (controlsRef.current) {
        controlsRef.current.update()
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }
    animate()

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
      }
      if (geometry) geometry.dispose()
      sceneRef.current = null
      cameraRef.current = null
      rendererRef.current = null
      controlsRef.current = null
    }
  }, [isOpen, imageUrl])

  // Sync autoRotate state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating
    }
  }, [isAutoRotating])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center ${isFullscreen ? '' : 'p-4 md:p-8'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      {/* Main Container */}
      <div 
        className={`relative bg-black shadow-2xl overflow-hidden transition-all duration-500 animate-in zoom-in-95 ease-out flex flex-col ${
          isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[85vh] rounded-3xl'
        }`}
      >
        {/* Header Overlay */}
        <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="flex flex-col gap-1 pointer-events-auto">
            <h3 className="text-white text-xl font-bold tracking-tight drop-shadow-md">{title}</h3>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-emerald-400" />
              Direct 3D Immersive View
            </p>
          </div>
          
          <div className="flex items-center gap-3 pointer-events-auto">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 w-11 h-11 transition-all"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title={isAutoRotating ? "Pause Auto-rotate" : "Start Auto-rotate"}
            >
              {isAutoRotating ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 w-11 h-11 transition-all"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-md border border-white/10 w-11 h-11 transition-all hover:scale-110 shadow-xl"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {loading && (
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-6" />
              <p className="text-white/50 text-xs font-bold tracking-widest uppercase">Initializing 3D Environment...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-red-500/30 flex flex-col items-center max-w-sm pointer-events-auto shadow-2xl animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-white text-sm font-medium mb-8 text-center leading-relaxed">{error}</p>
              <Button 
                onClick={onClose} 
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 h-12 font-bold transition-all shadow-lg"
              >
                Return to Planner
              </Button>
            </div>
          )}
        </div>

        {/* Viewer Container */}
        <div 
          ref={containerRef} 
          className="w-full h-full cursor-move"
        />

        {/* Bottom UI */}
        {!loading && !error && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest z-20 pointer-events-none whitespace-nowrap">
            Left Click to Rotate • Scroll to Zoom
          </div>
        )}
      </div>
    </div>
  )
}
