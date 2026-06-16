export interface WeatherCurrent {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weatherCode?: number;
  time?: string;
  precipitationProbability?: number;
}

export interface WeatherResponse {
  location: {
    name?: string;
    lat: number;
    lon: number;
  };
  current?: WeatherCurrent | null;
  timestamp: string;
  error?: string;
}
