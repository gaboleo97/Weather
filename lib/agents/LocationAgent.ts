// LocationAgent
// Provides location data via GPS or manual city entry.
// All browser geolocation is optional and guarded to avoid SSR issues.

export type GeoPoint = { lat: number; lon: number; name?: string };

export class LocationAgent {
  // Attempts to read GPS coordinates from the browser
  static async fromGPS(): Promise<GeoPoint> {
    if (typeof window === 'undefined' || !('navigator' in window)) {
      throw new Error('Geolocation is not available in this environment');
    }
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });
    const coords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    return coords;
  }
}
