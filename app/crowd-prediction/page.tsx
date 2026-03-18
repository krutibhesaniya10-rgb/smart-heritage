import CrowdDashboard from "@/components/crowd/crowd-dashboard"

export const metadata = {
  title: "Crowd Prediction - Plan Your Visit | Heritage Explorer",
  description: "Check real-time crowd predictions for heritage sites. Plan your visit during low-crowd hours for the best experience.",
}

export default function CrowdPredictionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-sm font-medium mb-4">
            Smart Planning
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Crowd Predictions
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            Plan your visit wisely with our crowd prediction data. 
            Find the best times to visit heritage sites and avoid the crowds.
          </p>
        </div>
      </section>

      {/* Dashboard */}
      <CrowdDashboard />
    </div>
  )
}
