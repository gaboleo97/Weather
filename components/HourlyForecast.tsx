import React from 'react'
import type { HourlyForecast as HourlyType } from '../lib/models/WeatherResponse'
import { getWeatherInfo } from '../lib/utils/weatherCodes'
import WeatherIcon from './WeatherIcon'

type Props = { items: HourlyType[] }

function formatHour(iso: string): string {
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'))
  const now = new Date()
  if (d.getHours() === now.getHours() && d.getDate() === now.getDate()) return 'Ahora'
  return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
}

const HourlyForecast: React.FC<Props> = ({ items }) => {
  if (!items.length) return null
  return (
    <div className="section">
      <div className="section-title">Por hora</div>
      <div className="hourly-scroll">
        {items.map((h, i) => {
          const info = getWeatherInfo(h.weatherCode, true)
          return (
            <div key={i} className="hourly-item">
              <div className="hi-time">{formatHour(h.time)}</div>
              <WeatherIcon icon={info.icon} size={28} />
              <div className="hi-temp">{Math.round(h.temperature)}°</div>
              {h.precipitationProbability > 0 && (
                <div className="hi-precip">{h.precipitationProbability}%</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HourlyForecast
