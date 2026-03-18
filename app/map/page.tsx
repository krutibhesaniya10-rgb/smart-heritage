import InteractiveMap from "@/components/map/interactive-map"

export const metadata = {
  title: "Heritage Map - Explore Heritage Sites | Heritage Explorer",
  description: "Navigate and explore heritage sites on our interactive map. Find monuments, temples, palaces, and historical landmarks near you.",
}

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <InteractiveMap />
    </div>
  )
}
