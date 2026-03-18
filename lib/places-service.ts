
export interface Place {
  id: string
  name: string
  lat: number
  lng: number
  type: 'cafe' | 'restaurant' | 'hotel' | 'scenic' | 'monument'
  rating: number
  address: string
}

const customDB: Place[] = [
  // Mehsana / Modhera area
  { id: 'p1', name: 'Sun Temple Cafe', lat: 23.584, lng: 72.134, type: 'cafe', rating: 4.5, address: 'Modhera, Mehsana' },
  { id: 'p2', name: 'Gajanan Restaurant', lat: 23.582, lng: 72.132, type: 'restaurant', rating: 4.2, address: 'Modhera Road' },
  { id: 'p3', name: 'Modhera Heritage Resort', lat: 23.590, lng: 72.140, type: 'hotel', rating: 4.0, address: 'Near Becharaji' },
  
  // Jodhpur area
  { id: 'p4', name: 'Indique Design Restaurant', lat: 26.298, lng: 73.020, type: 'restaurant', rating: 4.8, address: 'Near Mehrangarh Fort' },
  { id: 'p5', name: 'Raas Jodhpur', lat: 26.296, lng: 73.022, type: 'hotel', rating: 4.9, address: 'Old City, Jodhpur' },
  { id: 'p6', name: 'Stepwell Cafe', lat: 26.295, lng: 73.021, type: 'cafe', rating: 4.6, address: 'Tunwarji ka Jhalra' },

  // Ahmedabad area
  { id: 'p7', name: 'Agashiye', lat: 23.028, lng: 72.580, type: 'restaurant', rating: 4.7, address: 'Lal Darwaja, Ahmedabad' },
  { id: 'p8', name: 'House of MG', lat: 23.027, lng: 72.581, type: 'hotel', rating: 4.8, address: 'Ahmedabad' },
]

export async function fetchNearbyPlaces(lat: number, lng: number, radius: number = 5000): Promise<Place[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Real implementation would hit Foursquare API here:
  // const res = await fetch(`https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=${radius}`, {
  //   headers: { Authorization: process.env.FOURSQUARE_API_KEY }
  // })
  
  // For now, use our custom DB filtering by distance
  return customDB.filter(place => {
    const dist = calculateDistance(lat, lng, place.lat, place.lng)
    return dist <= radius / 1000 // radius in meters to km
  })
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
