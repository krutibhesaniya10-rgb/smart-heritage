import Link from "next/link"
import { MapPin, Camera, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: MapPin,
    title: "Interactive Map",
    description: "Navigate heritage sites with our detailed interactive map and get directions.",
    href: "/map",
    color: "bg-heritage-wineberry",
  },
  {
    icon: Camera,
    title: "Virtual Tours",
    description: "Experience 360° virtual tours of monuments from the comfort of your home.",
    href: "/virtual-tour",
    color: "bg-heritage-clay",
  },
  {
    icon: BarChart3,
    title: "Crowd Predictions",
    description: "Plan your visit with real-time crowd data and best time recommendations.",
    href: "/crowd-prediction",
    color: "bg-heritage-temptress",
  },
]

export default function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Link 
              key={feature.title} 
              href={feature.href}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-clay/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-heritage-wineberry/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3 text-balance">
                Ready to Explore Heritage Sites?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl text-pretty">
                Start your journey today and discover the rich cultural heritage. 
                Plan your perfect visit with our comprehensive tools and guides.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/map">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Start Exploring
                </Button>
              </Link>
              <Link href="/virtual-tour">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
