import TripPlanner from "@/components/trip-planner/trip-planner"

export const metadata = {
  title: "Smart Trip Planner - Plan Your Heritage Visit | Heritage Explorer",
  description: "Plan your perfect heritage trip. Select multiple places, get AI-optimized itineraries, explore in 360°, and view interactive route maps.",
}

export default function TripPlannerPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#5e3417] via-[#4a2a12] to-[#3a1e0a] text-white py-16 md:py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#8c623b] blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#d4c4a8] blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Smart Trip Planning
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
            Plan Your Heritage
            <span className="block text-[#d4c4a8]">Adventure</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-pretty text-base md:text-lg">
            Select heritage places, get an optimized route, explore sites in 360°,
            and discover hidden gems along the way — all in one smart planner.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: "🗺️", text: "Route Optimization" },
              { icon: "🔄", text: "360° Exploration" },
              { icon: "📍", text: "Google Maps" },
              { icon: "💡", text: "Smart Suggestions" },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 backdrop-blur-sm">
                <span>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Planner Component */}
      <TripPlanner />
    </div>
  )
}
