import type { WeatherResponse } from '../models/WeatherResponse'
import { fetchWeatherData } from './WeatherAgent'
import { geocodeCity } from './GeocodeAgent'

export type LocationInput = { lat: number; lon: number; name?: string } | { city: string }

export async function fetchWeather(input: LocationInput): Promise<WeatherResponse> {
  const started = new Date()
  const ts = started.toISOString()
  let location: { lat: number; lon: number; name?: string } = { lat: 0, lon: 0 }
  try {
    if ('lat' in input && 'lon' in input) {
      location = { lat: input.lat, lon: input.lon, name: input.name }
    } else {
      const coords = await geocodeCity(input.city)
      location = { lat: coords.lat, lon: coords.lon, name: coords.name }
    }

    const data = await fetchWeatherData(location.lat, location.lon)

    return {
      location,
      current: data.current,
      hourly: data.hourly,
      daily: data.daily,
      timestamp: ts,
    }
  } catch (err: any) {
    return {
      location: { lat: location?.lat ?? 0, lon: location?.lon ?? 0, name: location?.name },
      current: null,
      timestamp: ts,
      error: err?.message ?? 'Unknown error',
    }
  }
}
