// API façade: simple wrappers para orquestar llamadas de clima desde la UI o agentes
import { fetchWeather } from './agents/OrchestratorAgent'
import type { LocationInput } from './agents/OrchestratorAgent'
import type { WeatherResponse } from './models/WeatherResponse'

export async function fetchWeatherFor(input: LocationInput): Promise<WeatherResponse> {
  return await fetchWeather(input)
}
