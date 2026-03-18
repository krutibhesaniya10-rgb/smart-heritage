import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const upcomingEvents = [
  {
    id: 1,
    name: "Heritage Music Festival",
    date: "April 15-17, 2026",
    location: "Palace Grounds",
    image: "/images/cultural-event.jpg",
    type: "Festival",
  },
  {
    id: 2,
    name: "Traditional Dance Showcase",
    date: "April 22, 2026",
    location: "Cultural Center",
    image: "/images/heritage-1.jpg",
    type: "Performance",
  },
  {
    id: 3,
    name: "Artisan Craft Exhibition",
    date: "May 1-5, 2026",
    location: "Heritage Museum",
    image: "/images/heritage-3.jpg",
    type: "Exhibition",
  },
  {
    id: 4,
    name: "Night Heritage Walk",
    date: "Every Saturday",
    location: "Old City",
    image: "/images/heritage-2.jpg",
    type: "Tour",
  },
]

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-heritage-clay text-sm font-medium uppercase tracking-wider">
              Cultural Calendar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Upcoming Cultural Events
            </h2>
          </div>
          <Link href="/events">
            <Button variant="outline" className="group">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {event.type}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {event.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-heritage-clay" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-heritage-clay" />
                    {event.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
