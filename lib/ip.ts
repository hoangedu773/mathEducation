interface GeoData {
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
}

const IP_CACHE_KEY = "quiz_ip_cache";
const GEO_CACHE_KEY = "quiz_geo_cache";

export async function getClientIP(): Promise<string> {
  try {
    const cached = localStorage.getItem(IP_CACHE_KEY);
    if (cached) return cached;

    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    localStorage.setItem(IP_CACHE_KEY, data.ip);
    return data.ip;
  } catch {
    return "unknown";
  }
}

export async function getGeoData(ip: string): Promise<GeoData> {
  if (ip === "unknown") return { city: null, country: null, lat: null, lon: null };

  try {
    const cacheKey = GEO_CACHE_KEY + "_" + ip;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const res = await fetch(`https://ip-api.com/json/${ip}`);
    const data = await res.json();
    const geo: GeoData = {
      city: data.city || null,
      country: data.country || null,
      lat: data.lat || null,
      lon: data.lon || null,
    };
    localStorage.setItem(cacheKey, JSON.stringify(geo));
    return geo;
  } catch {
    return { city: null, country: null, lat: null, lon: null };
  }
}
