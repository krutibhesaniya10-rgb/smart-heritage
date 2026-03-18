import HeroSection from "@/components/home/hero-section"
import FeaturedPlaces from "@/components/home/featured-places"
import UpcomingEvents from "@/components/home/upcoming-events"
import CTASection from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPlaces />
      <UpcomingEvents />
      <CTASection />
    </div>
  )
}
