import UpcomingEvents from "@/components/events/upcoming-events"

export const metadata = {
  title: "Upcoming Events - Festivals & Heritage Experiences | Heritage Explorer",
  description:
    "Browse upcoming heritage events and festivals across Gujarat and Rajasthan. Filter by month/state and plan your trip around cultural experiences.",
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-sm font-medium mb-4">
            Cultural Calendar
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">Upcoming Events</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            Explore heritage walks, light & sound shows, seasonal experiences, and festival celebrations — all linked to
            iconic places in Gujarat and Rajasthan.
          </p>
        </div>
      </section>

      <UpcomingEvents />
    </div>
  )
}
