export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "[futuredomainhere]";

// Data source from the deck.gl documentation
export const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json";

// Google Maps API key
export const GOOGLE_MAPS_API_KEY =
  globalThis.process.env.GOOGLE_MAPS_API_KEY ?? "";
