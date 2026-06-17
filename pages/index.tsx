import React, { useEffect, useState } from 'react'
import CurrentWeather from '../components/CurrentWeather'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import WeatherDetails from '../components/WeatherDetails'
import { fetchWeatherFor } from '../lib/api'
import type { WeatherResponse } from '../lib/models/WeatherResponse'

type LocationInput = { lat: number; lon: number; name?: string } | { city: string }

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WeatherResponse | undefined>(undefined)
  const [city, setCity] = useState('')
  const [error, setError] = useState<string | null>(null)

  const updateWeather = async (input: LocationInput) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchWeatherFor(input)
      setData(res)
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener clima')
    } finally {
      setLoading(false)
    }
  }

  const useGPS = async () => {
    try {
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          await updateWeather({ lat, lon })
        }, () => {
          setError('No se pudo obtener la ubicación GPS')
        }, { enableHighAccuracy: true, timeout: 10000 })
      } else {
        setError('Geolocalización no soportada en este navegador')
      }
    } catch {
      setError('Error al usar GPS')
    }
  }

  const searchCity = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!city.trim()) return
    await updateWeather({ city: city.trim() })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.location?.lat && data?.location?.lon) {
        updateWeather({ lat: data.location.lat, lon: data.location.lon, name: data.location.name })
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [data?.location?.lat, data?.location?.lon])

  useEffect(() => { useGPS() }, [])

  return (
    <div className="container">
      <form onSubmit={searchCity} className="search-row">
        <input
          className="input"
          placeholder="Buscar ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="city-search"
        />
        <button type="submit" className="btn" aria-label="search-city">Buscar</button>
        <button type="button" className="btn btn-ghost" onClick={() => useGPS()} aria-label="use-gps">
          GPS
        </button>
      </form>

      {error && <div className="error-msg">{error}</div>}

      {data?.current && (
        <>
          <CurrentWeather current={data.current} locationName={data.location.name} />
          <HourlyForecast items={data.hourly ?? []} />
          <DailyForecast items={data.daily ?? []} />
          <WeatherDetails current={data.current} daily={data.daily} />
        </>
      )}

      {loading && <div className="loading-indicator">Cargando...</div>}

      {data?.error && !data?.current && (
        <div className="error-msg">{data.error}</div>
      )}
    </div>
  )
}
