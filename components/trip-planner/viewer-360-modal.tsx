"use client"

import dynamic from "next/dynamic"
import { HeritagePlace } from "@/lib/heritage-data"

// Dynamically import the heavy viewer component (already handles its own modal UI)
const DynamicPanoramicViewer = dynamic(() => import("../virtual-tour/panoramic-viewer"), {
  ssr: false,
})

interface Viewer360ModalProps {
  place: HeritagePlace | null
  isOpen: boolean
  onClose: () => void
}

export default function Viewer360Modal({ place, isOpen, onClose }: Viewer360ModalProps) {
  if (!place) return null

  // Ensure we have a high-quality equirectangular source
  // Demo placeholder if place.panoImage isn't defined
  const panoramaSource = place.panoImage || "https://upload.wikimedia.org/wikipedia/commons/e/e0/360_panorama_of_interior_of_Saint_John_the_Baptist_Church_in_Budapest.jpg"

  return (
    <DynamicPanoramicViewer
      imageUrl={panoramaSource}
      title={place.name}
      isOpen={isOpen}
      onClose={onClose}
      autoRotate={true}
    />
  )
}
