// WeatherAgent
// Consulta Open-Meteo Current Weather API para coordenadas dadas.

export async function getCurrentWeather(lat: number, lon: number): Promise<{ temperature: number; windSpeed: number; windDirection: number; time?: string; weatherCode?: number }> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch current weather')
  const data = await res.json()
  const cw = data?.current_weather
  if (!cw) throw new Error('Current weather data not available')
  return {
    temperature: Number(cw.temperature),
    windSpeed: Number(cw.windspeed),
    windDirection: Number(cw.winddirection),
    time: cw.time,
    weatherCode: cw.weathercode,
  }
}
