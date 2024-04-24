import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { type ClassValue, clsx } from "clsx";
import type { Feature, GeoJSON } from "geojson";
import { twMerge } from "tailwind-merge";
import { StudyRoom } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Normalize the room data to match the StudyRoom type
export function normalizeRoomData(room: any): StudyRoom {
  return {
    id: room.ID,
    name: room.Name,
    image: room.Image,
    noiseLevel: room.NoiseLevel,
    seats: room.Seats,
    technology: room.Technology,
    seating: room.Seating,
    location: room.Location,
    coordinates: {
      latitude: room.Coordinates.Latitude,
      longitude: room.Coordinates.Longitude,
    },
  };
}

// Example from the deck.gl documentation
export function getDeckGlLayers(data: GeoJSON | null) {
  if (!data) return [];

  return [
    new GeoJsonLayer({
      id: "geojson-layer",
      data,
      stroked: false,
      filled: true,
      extruded: true,
      pointType: "circle",
      lineWidthScale: 20,
      lineWidthMinPixels: 4,
      getFillColor: [160, 160, 180, 200],
      getLineColor: (f: Feature) => {
        const hex = f?.properties?.color;

        if (!hex) return [0, 0, 0];

        return hex.match(/[0-9a-f]{2}/g)!.map((x: string) => parseInt(x, 16));
      },
      getPointRadius: 200,
      getLineWidth: 1,
      getElevation: 30,
    }),
  ];
}
