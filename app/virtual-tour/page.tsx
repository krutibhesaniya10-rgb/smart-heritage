import ImageGallery from "@/components/virtual-tour/image-gallery"

export const metadata = {
  title: "Virtual Tours - Heritage Image Gallery | Heritage Explorer",
  description: "Explore heritage sites through our stunning image gallery. Discover ancient temples, palaces, and monuments with detailed historical information.",
}

export default function VirtualTourPage() {
  return (
    <div className="min-h-screen bg-[#f9edd2]">
      {/* Hero */}
      <section className="bg-[#5e3417] text-[#f9edd2] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-[#8c623b] text-sm font-medium mb-4">
            Heritage Collection
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Virtual Heritage Tours
          </h1>
          <p className="text-[#f9edd2]/80 max-w-2xl mx-auto text-pretty">
            Explore the beauty and grandeur of cultural heritage through our curated image gallery. 
            Each photograph captures centuries of history, architecture, and tradition.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <ImageGallery />
    </div>
  )
}
