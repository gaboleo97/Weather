import React, { useEffect, useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import { fetchWeatherFor } from '../lib/api'
import type { WeatherResponse } from '../lib/models/WeatherResponse'

type LocationInput = { lat: number; lon: number; name?: string } | { city: string }

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState<WeatherResponse | undefined>(undefined)
  const [city, setCity] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Función central para obtener clima basado en entrada
  const updateWeather = async (input: LocationInput) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchWeatherFor(input)
      setWeather(res)
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener clima')
    } finally {
      setLoading(false)
    }
  }

  // Intento inicial: usar GPS si está disponible
  const useGPS = async () => {
    try {
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        // @ts-ignore
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          await updateWeather({ lat, lon })
        }, (err) => {
          setError('No se pudo obtener la ubicación GPS')
        }, { enableHighAccuracy: true, timeout: 10000 })
      } else {
        setError('Geolocalización no soportada en este navegador')
      }
    } catch {
      setError('Error al usar GPS')
    }
  }

  // Búsqueda por ciudad
  const searchCity = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!city.trim()) return
    await updateWeather({ city: city.trim() })
  }

  // Actualización periódica cada 60 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (weather?.location?.lat && weather?.location?.lon) {
        updateWeather({ lat: weather.location.lat, lon: weather.location.lon, name: weather.location.name })
      }
    }, 60000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather?.location?.lat, weather?.location?.lon])

  // Carga inicial: intenta GPS
  useEffect(() => { useGPS() }, [])

  return (
    <div className="container">
      <h1 style={{ marginTop: 0 }}>Clima en Tiempo Real</h1>
      <p className="muted">Obtén el clima actual según tu ubicación GPS o una ciudad.</p>

      <form onSubmit={searchCity} className="row" style={{ alignItems: 'center', marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Buscar ciudad (ej. Madrid)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="city-search"
        />
        <button type="submit" className="btn" aria-label="search-city">Buscar</button>
        <button type="button" className="btn" onClick={() => useGPS()} aria-label="use-gps">Usar mi ubicación</button>
      </form>

      <WeatherCard data={weather} />
      {loading && <p className="muted">Cargando clima…</p>}
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )
}
