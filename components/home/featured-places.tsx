import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featuredPlaces = [
  {
    id: 1,
    name: "Ancient Temple Complex",
    location: "Heritage Valley",
    image: "/images/heritage-1.jpg",
    rating: 4.8,
    timing: "6:00 AM - 6:00 PM",
    description: "A magnificent temple complex dating back to the 12th century with intricate stone carvings.",
  },
  {
    id: 2,
    name: "Royal Fortress",
    location: "Hill District",
    image: "/images/heritage-2.jpg",
    rating: 4.9,
    timing: "9:00 AM - 5:00 PM",
    description: "Historic fortress offering panoramic views and tales of ancient battles and royal heritage.",
  },
  {
    id: 3,
    name: "Palace of Mirrors",
    location: "Cultural Quarter",
    image: "/images/heritage-3.jpg",
    rating: 4.7,
    timing: "10:00 AM - 7:00 PM",
    description: "An architectural marvel featuring ornate courtyards and stunning mirror work throughout.",
  },
]

export default function FeaturedPlaces() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-heritage-clay text-sm font-medium uppercase tracking-wider">
            Featured Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Explore Popular Heritage Sites
          </h2>
          <p className="text-muted-foreground text-pretty">
            Discover the most visited historical monuments and cultural landmarks 
            that showcase centuries of rich heritage and architectural brilliance.
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{place.rating}</span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {place.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4 text-heritage-clay" />
                  {place.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Clock className="w-4 h-4 text-heritage-clay" />
                  {place.timing}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {place.description}
                </p>
                <Link href={`/heritage/${place.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/map">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore All Heritage Sites
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
