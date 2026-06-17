import React from 'react'
import type { WeatherCurrent } from '../lib/models/WeatherResponse'
import { getWeatherInfo } from '../lib/utils/weatherCodes'
import WeatherIcon from './WeatherIcon'

type Props = {
  current: WeatherCurrent
  locationName?: string
}

const CurrentWeather: React.FC<Props> = ({ current, locationName }) => {
  const info = getWeatherInfo(current.weatherCode, current.isDay)
  return (
    <div className="current-weather">
      <div className="cw-location">{locationName ?? 'Ubicación'}</div>
      <div className="cw-main">
        <WeatherIcon icon={info.icon} size={80} />
        <div className="cw-temp">{Math.round(current.temperature)}°</div>
      </div>
      <div className="cw-desc">{info.label}</div>
      <div className="cw-feels">Sensación térmica: {Math.round(current.feelsLike)}°</div>
      <div className="cw-meta">
        <span>Viento: {current.windSpeed} m/s</span>
        <span>·</span>
        <span>Precip.: {current.precipitation} mm</span>
      </div>
    </div>
  )
}

export default CurrentWeather
