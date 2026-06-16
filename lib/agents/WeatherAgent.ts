// WeatherAgent
// Consulta Open-Meteo Current Weather API para coordenadas dadas.

export async function getCurrentWeather(lat: number, lon: number): Promise<{ temperature: number; windSpeed: number; windDirection: number; time?: string; weatherCode?: number; precipitationProbability?: number }> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&hourly=precipitation_probability&wind_speed_unit=ms&timezone=auto`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch current weather')
  const data = await res.json()
  const cw = data?.current
  if (!cw) throw new Error('Current weather data not available')
  let precipitationProbability: number | undefined
  if (data?.hourly?.precipitation_probability && data?.hourly?.time) {
    const currentHour = cw.time.substring(0, 13) + ':00'
    const idx = data.hourly.time.indexOf(currentHour)
    if (idx !== -1) {
      precipitationProbability = data.hourly.precipitation_probability[idx]
    }
  }
  return {
    temperature: Number(cw.temperature_2m),
    windSpeed: Number(cw.wind_speed_10m),
    windDirection: Number(cw.wind_direction_10m),
    time: cw.time,
    weatherCode: cw.weather_code,
    precipitationProbability,
  }
}
