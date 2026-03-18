import { NextResponse } from 'next/server';
import { heritagePlaces } from '@/lib/heritage-data';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  const place = heritagePlaces.find((p) => p.id === id);

  if (!place) {
    return NextResponse.json({ message: 'Place not found' }, { status: 404 });
  }

  // Return ONLY that place's specific details needed for gallery
  return NextResponse.json({
    id: place.id,
    name: place.name,
    description: place.description,
    location: place.location || `${place.city}, ${place.state}`,
    category: place.category,
    image_url: place.image,
    gallery_images: place.images,
    rating: place.rating,
    era: place.era || place.history?.split('.')[0] || "Ancient"
  });
}
