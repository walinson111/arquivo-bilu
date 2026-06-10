const NASA_API = "https://images-api.nasa.gov";

export interface NasaImage {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  thumb: string;
}

export async function searchNasaImages(query: string, limit = 6): Promise<NasaImage[]> {
  try {
    // page_size não funciona — a API usa "page" e retorna ~20 por padrão
    const url = `${NASA_API}/search?q=${encodeURIComponent(query)}&media_type=image`;
    const res  = await fetch(url);
    if (!res.ok) return [];

    const data  = await res.json();
    const items: any[] = data?.collection?.items ?? [];

    const results: NasaImage[] = [];

    for (const item of items) {
      if (!item?.data?.[0] || !item?.links?.length) continue;

      // Busca especificamente o link com rel="preview" (thumb garantido ~640px)
      const previewLink = item.links.find(
        (l: any) => l.rel === "preview" && l.render === "image"
      );
      // Fallback: qualquer link de imagem
      const anyImg = item.links.find((l: any) => l.render === "image");
      const thumb  = previewLink?.href ?? anyImg?.href;

      if (!thumb) continue;

      results.push({
        nasa_id:      item.data[0].nasa_id      ?? "",
        title:        item.data[0].title         ?? "",
        description:  item.data[0].description   ?? "",
        date_created: item.data[0].date_created  ?? "",
        thumb,
      });

      if (results.length >= limit) break;
    }

    return results;
  } catch {
    return [];
  }
}
