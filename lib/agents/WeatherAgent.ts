import type { WeatherCurrent, HourlyForecast, DailyForecast } from '../models/WeatherResponse'

const BASE = 'https://api.open-meteo.com/v1/forecast'

const CURRENT_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'weather_code',
  'wind_speed_10m',
  'wind_direction_10m',
  'pressure_msl',
  'cloud_cover',
  'visibility',
  'precipitation',
  'is_day',
]

const HOURLY_PARAMS = [
  'temperature_2m',
  'precipitation_probability',
  'weather_code',
  'wind_speed_10m',
  'wind_direction_10m',
]

const DAILY_PARAMS = [
  'temperature_2m_max',
  'temperature_2m_min',
  'weather_code',
  'precipitation_probability_max',
  'sunrise',
  'sunset',
  'uv_index_max',
  'wind_speed_10m_max',
]

export async function fetchWeatherData(
  lat: number,
  lon: number,
): Promise<{
  current: WeatherCurrent
  hourly: HourlyForecast[]
  daily: DailyForecast[]
}> {
  const url = `${BASE}?latitude=${lat}&longitude=${lon}&current=${CURRENT_PARAMS.join(',')}&hourly=${HOURLY_PARAMS.join(',')}&daily=${DAILY_PARAMS.join(',')}&wind_speed_unit=ms&timezone=auto&forecast_days=7`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch weather data')

  const data = await res.json()
  if (!data?.current) throw new Error('Current weather data not available')

  const c = data.current
  const current: WeatherCurrent = {
    temperature: Number(c.temperature_2m),
    feelsLike: Number(c.apparent_temperature),
    humidity: Number(c.relative_humidity_2m),
    pressure: Number(c.pressure_msl),
    cloudCover: Number(c.cloud_cover),
    visibility: Number(c.visibility),
    windSpeed: Number(c.wind_speed_10m),
    windDirection: Number(c.wind_direction_10m),
    weatherCode: Number(c.weather_code),
    precipitation: Number(c.precipitation),
    isDay: Boolean(c.is_day),
    dewPoint: 0,
    time: c.time,
  }

  if (data?.hourly?.time) {
    const h = data.hourly
    for (let i = 0; i < h.time.length; i++) {
      if (h.temperature_2m?.[i] != null) {
        current.dewPoint = calculateDewPoint(current.temperature, current.humidity)
        break
      }
    }
  }

  const hourly: HourlyForecast[] = []
  if (data?.hourly?.time) {
    const h = data.hourly
    for (let i = 0; i < h.time.length; i++) {
      hourly.push({
        time: h.time[i],
        temperature: Number(h.temperature_2m?.[i] ?? 0),
        precipitationProbability: Number(h.precipitation_probability?.[i] ?? 0),
        weatherCode: Number(h.weather_code?.[i] ?? 0),
        windSpeed: Number(h.wind_speed_10m?.[i] ?? 0),
        windDirection: Number(h.wind_direction_10m?.[i] ?? 0),
      })
    }
  }

  const daily: DailyForecast[] = []
  if (data?.daily?.time) {
    const d = data.daily
    for (let i = 0; i < d.time.length; i++) {
      daily.push({
        date: d.time[i],
        tempMax: Number(d.temperature_2m_max?.[i] ?? 0),
        tempMin: Number(d.temperature_2m_min?.[i] ?? 0),
        weatherCode: Number(d.weather_code?.[i] ?? 0),
        precipitationProbabilityMax: Number(d.precipitation_probability_max?.[i] ?? 0),
        sunrise: d.sunrise?.[i] ?? '',
        sunset: d.sunset?.[i] ?? '',
        uvIndexMax: Number(d.uv_index_max?.[i] ?? 0),
        windSpeedMax: Number(d.wind_speed_10m_max?.[i] ?? 0),
      })
    }
  }

  return { current, hourly, daily }
}

function calculateDewPoint(temp: number, humidity: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
  return (b * alpha) / (a - alpha)
}

export async function getCurrentWeather(lat: number, lon: number) {
  const { current } = await fetchWeatherData(lat, lon)
  return {
    temperature: current.temperature,
    windSpeed: current.windSpeed,
    windDirection: current.windDirection,
    time: current.time,
    weatherCode: current.weatherCode,
    precipitationProbability: 0,
  }
}
