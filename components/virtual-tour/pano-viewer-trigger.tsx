"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import PanoramicViewer from "./panoramic-viewer"
import dynamic from "next/dynamic"

// Dynamic import for the heavy viewer component
const DynamicPanoramicViewer = dynamic(() => import("./panoramic-viewer"), {
  ssr: false,
})

interface PanoViewerTriggerProps {
  imageUrl?: string
  title: string
}

export default function PanoViewerTrigger({ imageUrl, title }: PanoViewerTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // High-quality equirectangular placeholders for demo if no imageUrl provided
  const demoImages = [
    "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
    "https://photo-sphere-viewer-data.netlify.app/assets/sphere-test.jpg",
  ]
  
  const finalImageUrl = imageUrl || demoImages[0]

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full border-heritage-clay text-heritage-clay hover:bg-heritage-clay/10 transition-all font-semibold"
        onClick={() => setIsOpen(true)}
      >
        <Camera className="w-4 h-4 mr-2" />
        Explore 360° Virtual Tour
      </Button>

      {isOpen && (
        <DynamicPanoramicViewer
          imageUrl={finalImageUrl}
          title={title}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
