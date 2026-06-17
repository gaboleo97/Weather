export type WeatherIconName =
  | 'sun'
  | 'moon'
  | 'cloud-sun'
  | 'cloud-moon'
  | 'cloud'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunder'
  | 'hail'

export interface WeatherInfo {
  label: string
  icon: WeatherIconName
}

export function getWeatherInfo(code: number, isDay: boolean): WeatherInfo {
  if (code === 0) return isDay
    ? { label: 'Despejado', icon: 'sun' }
    : { label: 'Despejado', icon: 'moon' }

  if (code === 1) return isDay
    ? { label: 'Mayormente despejado', icon: 'sun' }
    : { label: 'Mayormente despejado', icon: 'moon' }

  if (code === 2) return isDay
    ? { label: 'Parcialmente nublado', icon: 'cloud-sun' }
    : { label: 'Parcialmente nublado', icon: 'cloud-moon' }

  if (code === 3) return { label: 'Nublado', icon: 'cloud' }

  if (code === 45 || code === 48) return { label: 'Niebla', icon: 'fog' }

  if (code >= 51 && code <= 55) return { label: 'Llovizna', icon: 'drizzle' }
  if (code === 56 || code === 57) return { label: 'Llovizna helada', icon: 'drizzle' }

  if (code >= 61 && code <= 65) return { label: 'Lluvia', icon: 'rain' }
  if (code === 66 || code === 67) return { label: 'Lluvia helada', icon: 'rain' }

  if (code >= 71 && code <= 77) return { label: 'Nieve', icon: 'snow' }

  if (code >= 80 && code <= 82) return { label: 'Chubascos', icon: 'rain' }
  if (code >= 85 && code <= 86) return { label: 'Chubascos de nieve', icon: 'snow' }

  if (code === 95) return { label: 'Tormenta', icon: 'thunder' }
  if (code >= 96 && code <= 99) return { label: 'Tormenta con granizo', icon: 'hail' }

  return { label: 'Desconocido', icon: 'cloud' }
}
