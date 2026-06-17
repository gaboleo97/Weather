import React from 'react'
import type { WeatherCurrent, DailyForecast } from '../lib/models/WeatherResponse'

type Props = {
  current: WeatherCurrent
  daily?: DailyForecast[]
}

function windDirLabel(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const i = Math.round(deg / 22.5) % 16
  return dirs[i]
}

function formatTime(iso: string): string {
  if (!iso) return '-'
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'))
  return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
}

const WeatherDetails: React.FC<Props> = ({ current, daily }) => {
  const today = daily?.[0]
  return (
    <div className="section">
      <div className="section-title">Detalles</div>
      <div className="details-grid">
        <div className="detail-card">
          <div className="dc-label">Viento</div>
          <div className="dc-value">{current.windSpeed} m/s</div>
          <div className="dc-sub">{windDirLabel(current.windDirection)} ({current.windDirection}°)</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Humedad</div>
          <div className="dc-value">{current.humidity}%</div>
          <div className="dc-sub">Punto rocío: {Math.round(current.dewPoint)}°</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Índice UV</div>
          <div className="dc-value">{today?.uvIndexMax ?? '-'}</div>
          <div className="dc-sub">Máximo del día</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Amanecer</div>
          <div className="dc-value">{today ? formatTime(today.sunrise) : '-'}</div>
          <div className="dc-sub">Atardecer: {today ? formatTime(today.sunset) : '-'}</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Presión</div>
          <div className="dc-value">{current.pressure} hPa</div>
          <div className="dc-sub">Nivel del mar</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Visibilidad</div>
          <div className="dc-value">{current.visibility >= 1000 ? `${(current.visibility / 1000).toFixed(1)} km` : `${current.visibility} m`}</div>
          <div className="dc-sub">-</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Nubosidad</div>
          <div className="dc-value">{current.cloudCover}%</div>
          <div className="dc-sub">-</div>
        </div>
        <div className="detail-card">
          <div className="dc-label">Precipitación</div>
          <div className="dc-value">{current.precipitation} mm</div>
          <div className="dc-sub">Última hora</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails
