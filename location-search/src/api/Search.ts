import type { Place } from "./Place";

interface SearchResponse {
  type: string;
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export const Search = async (term: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
  );
  const data: SearchResponse = await response.json();

  const places: Place[] = data.features.map(feature => ({
    id: feature.properties.place_id,
    name: feature.properties.display_name,
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
  }));

  return places;
};
