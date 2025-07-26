// frontend/src/lib/types.ts

export interface WeatherConfig {
  city: string; // z.B. "Würzburg"
  units: "metric" | "imperial";
}

export interface DashboardConfig {
  deviceId: string; // z.B. "dev-pc"
  layout: Record<string, any>; // Dein freies Layout‑JSON
  weatherConfig: WeatherConfig;
  newsFeed: string[]; // Liste von RSS‑Feed‑URLs
}

export interface WeatherData {
  temp: number; // gerundete Temperatur
  description: string; // z.B. "clear sky"
  icon: string; // volle URL zum Icon
}
