// GeocodeAgent
// Resuelve una ciudad a coordenadas usando Open-Meteo Geocoding API.
import type { GeoPoint } from './LocationAgent'

const GEOCODE_API = 'https://geocoding.open-meteo.com/v1/search?name='

export async function geocodeCity(city: string): Promise<{ lat: number; lon: number; name: string }> {
  const encoded = encodeURIComponent(city.trim())
  const url = `${GEOCODE_API}${encoded}&count=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to geocode city')
  const data = await res.json()
  const results = data?.results?.[0]
  if (!results?.latitude || !results?.longitude) {
    throw new Error('No geocoding results')
  }
  return {
    lat: Number(results.latitude),
    lon: Number(results.longitude),
    name: results.name ?? city,
  }
}
