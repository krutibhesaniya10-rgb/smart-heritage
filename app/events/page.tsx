import EventsCalendar from "@/components/events/events-calendar"

export const metadata = {
  title: "Cultural Events - Festivals & Celebrations | Heritage Explorer",
  description: "Discover upcoming cultural events, festivals, traditional celebrations, and heritage tours. Plan your visit around exciting cultural experiences.",
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-sm font-medium mb-4">
            Cultural Calendar
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Cultural Events & Festivals
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            Immerse yourself in vibrant cultural celebrations, traditional festivals, 
            and heritage events that bring history to life.
          </p>
        </div>
      </section>

      {/* Events Calendar */}
      <EventsCalendar />
    </div>
  )
}
