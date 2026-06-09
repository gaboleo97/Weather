import React from 'react'
import type { WeatherResponse } from '../lib/models/WeatherResponse'

type Props = { data?: WeatherResponse };

export const WeatherCard: React.FC<Props> = ({ data }) => {
  if (!data) return <div className="card">No data available</div>
  const { location, current, timestamp, error } = data
  return (
    <div className="card" aria-label="weather-card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="title">Clima Actual</div>
          <div className="subtitle">{location.name ?? 'Ubicación'}</div>
        </div>
        <div className="muted" style={{ textAlign: 'right' }}>{new Date(timestamp).toLocaleTimeString()}</div>
      </div>
      {error ? (
        <div style={{ color: '#f87171' }}>Error: {error}</div>
      ) : current ? (
        <div className="weather-grid" style={{ marginTop: 8 }}>
          <div className="card" aria-label="temperature">
            <div className="subtitle">Temperatura</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{current.temperature} °C</div>
          </div>
          <div className="card" aria-label="wind">
            <div className="subtitle">Viento</div>
            <div style={{ fontSize: 20 }}>{current.windSpeed} m/s, {current.windDirection}°</div>
          </div>
          <div className="card" aria-label="weatherCode">
            <div className="subtitle">Código Clima</div>
            <div style={{ fontSize: 20 }}>{current.weatherCode ?? '-'}</div>
          </div>
        </div>
      ) : (
        <div className="muted" style={{ marginTop: 8 }}>Cargando...</div>
      )}
    </div>
  )
}

export default WeatherCard
