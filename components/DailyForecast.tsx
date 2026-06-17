import React from 'react'
import type { DailyForecast as DailyType } from '../lib/models/WeatherResponse'
import { getWeatherInfo } from '../lib/utils/weatherCodes'
import WeatherIcon from './WeatherIcon'

type Props = { items: DailyType[] }

function dayName(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  if (d.toDateString() === today.toDateString()) return 'Hoy'
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (d.toDateString() === tomorrow.toDateString()) return 'Mañana'
  return d.toLocaleDateString('es', { weekday: 'long' })
}

const DailyForecast: React.FC<Props> = ({ items }) => {
  if (!items.length) return null
  const allTemps = items.flatMap(d => [d.tempMin, d.tempMax])
  const globalMin = Math.min(...allTemps)
  const globalMax = Math.max(...allTemps)
  const range = globalMax - globalMin || 1

  return (
    <div className="section">
      <div className="section-title">Pronóstico de 7 días</div>
      <div className="daily-list">
        {items.map((d, i) => {
          const info = getWeatherInfo(d.weatherCode, true)
          const leftPct = ((d.tempMin - globalMin) / range) * 100
          const widthPct = ((d.tempMax - d.tempMin) / range) * 100
          return (
            <div key={i} className="daily-row">
              <div className="dr-day">{dayName(d.date)}</div>
              <WeatherIcon icon={info.icon} size={24} />
              <div className="dr-precip">
                {d.precipitationProbabilityMax > 0 ? `${d.precipitationProbabilityMax}%` : ''}
              </div>
              <div className="dr-temp-min">{Math.round(d.tempMin)}°</div>
              <div className="dr-bar-track">
                <div
                  className="dr-bar-fill"
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 4)}%`,
                  }}
                />
              </div>
              <div className="dr-temp-max">{Math.round(d.tempMax)}°</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast
