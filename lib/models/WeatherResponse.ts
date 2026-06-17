export interface WeatherCurrent {
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  cloudCover: number
  visibility: number
  windSpeed: number
  windDirection: number
  weatherCode: number
  precipitation: number
  isDay: boolean
  dewPoint: number
  time: string
}

export interface HourlyForecast {
  time: string
  temperature: number
  precipitationProbability: number
  weatherCode: number
  windSpeed: number
  windDirection: number
}

export interface DailyForecast {
  date: string
  tempMax: number
  tempMin: number
  weatherCode: number
  precipitationProbabilityMax: number
  sunrise: string
  sunset: string
  uvIndexMax: number
  windSpeedMax: number
}

export interface WeatherResponse {
  location: {
    name?: string
    lat: number
    lon: number
  }
  current?: WeatherCurrent | null
  hourly?: HourlyForecast[]
  daily?: DailyForecast[]
  timestamp: string
  error?: string
}
