"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const events = [
  {
    id: 1,
    name: "Heritage Music Festival",
    date: "2026-04-15",
    endDate: "2026-04-17",
    time: "4:00 PM - 10:00 PM",
    location: "Palace Grounds",
    image: "/images/cultural-event.jpg",
    type: "Festival",
    description: "A three-day celebration of traditional music featuring performances by renowned artists. Experience the rich musical heritage through classical and folk performances.",
    attendees: 5000,
  },
  {
    id: 2,
    name: "Traditional Dance Showcase",
    date: "2026-04-22",
    time: "6:00 PM - 9:00 PM",
    location: "Cultural Center",
    image: "/images/heritage-1.jpg",
    type: "Performance",
    description: "Witness the grace and beauty of traditional dance forms performed by master artists and their students.",
    attendees: 800,
  },
  {
    id: 3,
    name: "Artisan Craft Exhibition",
    date: "2026-05-01",
    endDate: "2026-05-05",
    time: "10:00 AM - 6:00 PM",
    location: "Heritage Museum",
    image: "/images/heritage-3.jpg",
    type: "Exhibition",
    description: "Explore exquisite handcrafted artifacts, textiles, and traditional art forms created by skilled local artisans.",
    attendees: 2000,
  },
  {
    id: 4,
    name: "Night Heritage Walk",
    date: "2026-04-20",
    time: "7:00 PM - 9:30 PM",
    location: "Old City",
    image: "/images/heritage-2.jpg",
    type: "Tour",
    description: "Experience the magic of heritage sites under moonlight. Guided tour through historic streets with stories of the past.",
    attendees: 50,
  },
  {
    id: 5,
    name: "Spring Harvest Festival",
    date: "2026-04-25",
    endDate: "2026-04-27",
    time: "9:00 AM - 8:00 PM",
    location: "Temple Complex",
    image: "/images/virtual-tour.jpg",
    type: "Festival",
    description: "Celebrate the spring harvest with traditional rituals, folk performances, and authentic local cuisine.",
    attendees: 10000,
  },
  {
    id: 6,
    name: "Heritage Photography Workshop",
    date: "2026-05-10",
    time: "6:00 AM - 12:00 PM",
    location: "Royal Fortress",
    image: "/images/heritage-2.jpg",
    type: "Workshop",
    description: "Learn the art of architectural photography at one of the most photogenic heritage sites.",
    attendees: 30,
  },
]

const eventTypes = ["All", "Festival", "Performance", "Exhibition", "Tour", "Workshop"]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)) // April 2026
  const [selectedType, setSelectedType] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    const matchesMonth = eventDate.getMonth() === currentDate.getMonth() && 
                        eventDate.getFullYear() === currentDate.getFullYear()
    const matchesType = selectedType === "All" || event.type === selectedType
    return matchesMonth && matchesType
  })

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Festival": return "bg-heritage-wineberry"
      case "Performance": return "bg-heritage-clay"
      case "Exhibition": return "bg-heritage-temptress"
      case "Tour": return "bg-primary"
      case "Workshop": return "bg-green-700"
      default: return "bg-primary"
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Month Navigation */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground min-w-[180px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full ${getTypeColor(event.type)} text-primary-foreground text-xs font-medium`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-primary-foreground line-clamp-1">
                      {event.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-heritage-clay" />
                    {formatDate(event.date)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-heritage-clay" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-heritage-clay" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Events This Month</h3>
            <p className="text-muted-foreground">
              Check other months or change the event type filter.
            </p>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 animate-fade-in">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="relative h-64">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-card/50 hover:bg-card text-foreground"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="absolute bottom-4 left-6">
                  <span className={`px-3 py-1 rounded-full ${getTypeColor(selectedEvent.type)} text-primary-foreground text-xs font-medium`}>
                    {selectedEvent.type}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {selectedEvent.name}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium text-foreground">
                        {formatDate(selectedEvent.date)}
                        {selectedEvent.endDate && ` - ${formatDate(selectedEvent.endDate)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="text-sm font-medium text-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-clay/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-heritage-clay" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Attendance</p>
                      <p className="text-sm font-medium text-foreground">{selectedEvent.attendees.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedEvent.description}
                </p>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    Register Now
                  </Button>
                  <Button variant="outline">
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
