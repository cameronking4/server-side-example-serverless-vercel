export const envConfig = {
  weather: {
    baseUrl:
      process.env.WEATHER_BASE_URL ?? `https://api.openweathermap.org/data/2.5`,
    apiKey: process.env.WEATHER_API_KEY ?? ``,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? ``,
  },
  supabase: {
    url: process.env.SUPABASE_PROJECT_URL ?? ``,
    anonKey: process.env.SUPABASE_ANON_KEY ?? ``,
  },
};
