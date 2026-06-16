// OrchestratorAgent
// Orquestación ligera de IA: coordina Location/Geocode/Weather y normaliza WeatherResponse.
import type { WeatherResponse } from '../models/WeatherResponse'
import { getCurrentWeather } from './WeatherAgent'
import { geocodeCity } from './GeocodeAgent'
import type { GeoPoint } from './LocationAgent'

export type LocationInput = { lat: number; lon: number; name?: string } | { city: string }

export async function fetchWeather(input: LocationInput): Promise<WeatherResponse> {
  // Timestamp de inicio
  const started = new Date()
  const ts = started.toISOString()
  let location: { lat: number; lon: number; name?: string } = { lat: 0, lon: 0 }
  try {
    if ('lat' in input && 'lon' in input) {
      location = { lat: input.lat, lon: input.lon, name: input.name }
    } else {
      // city given
      const coords = await geocodeCity(input.city)
      location = { lat: coords.lat, lon: coords.lon, name: coords.name }
    }
    // Get weather current
    const w = await getCurrentWeather(location.lat, location.lon)
    const result: WeatherResponse = {
      location,
      current: {
        temperature: w.temperature,
        windSpeed: w.windSpeed,
        windDirection: w.windDirection,
        weatherCode: w.weatherCode,
        time: w.time,
        precipitationProbability: w.precipitationProbability,
      },
      timestamp: ts,
    }
    return result
  } catch (err: any) {
    return {
      location: { lat: location?.lat ?? 0, lon: location?.lon ?? 0, name: location?.name },
      current: null,
      timestamp: ts,
      error: err?.message ?? 'Unknown error',
    }
  }
}
