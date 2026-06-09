// ─── NASA Image & Video Library API ──────────────────────────────────────────
// Documentação: https://images-api.nasa.gov
// Gratuita, sem chave, sem CORS issues no app nativo.

const NASA_API = "https://images-api.nasa.gov";

export interface NasaImage {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  thumb: string; // URL da thumbnail
}

export async function searchNasaImages(query: string, limit = 6): Promise<NasaImage[]> {
  try {
    const url = `${NASA_API}/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${limit}`;
    const res = await fetch(url);

    if (!res.ok) return [];

    const data = await res.json();
    const items = data?.collection?.items ?? [];

    return items
      .filter((item: any) => item?.links?.[0]?.href && item?.data?.[0])
      .map((item: any) => ({
        nasa_id:      item.data[0].nasa_id,
        title:        item.data[0].title ?? "",
        description:  item.data[0].description ?? "",
        date_created: item.data[0].date_created ?? "",
        thumb:        item.links[0].href,
      }));
  } catch {
    return [];
  }
}