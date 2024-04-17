import { useEffect, useState } from "react";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGlOverlay } from "./deckgl-overlay";

// Data source from the deck.gl documentation
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json";

import type { Feature, GeoJSON } from "geojson";
import { useNavigate } from "react-router-dom";
import RoomCard from "./room-card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const API_KEY = globalThis.process.env.GOOGLE_MAPS_API_KEY ?? "";

// Example from the deck.gl documentation
function getDeckGlLayers(data: GeoJSON | null) {
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

const studyRooms = [
  {
    id: 1,
    name: "KEC 1001 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
    // ... we'll need to add more fields as needed (backend will provide this data)
  },
  {
    id: 2,
    name: "417 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/STUDYSPACE_210_Alderman_417.jpg",
    noiseLevel: "Low Hum",
    seats: 17,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Alderman Hall",
  },
  {
    id: 3,
    name: "KEC 1003 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
  },
  {
    id: 4,
    name: "KEC 1004 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
  },
  {
    id: 5,
    name: "KEC 1005 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function ExplorePage({ className, ...props }: CardProps) {
  const [data, setData] = useState<GeoJSON | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => setData(data as GeoJSON));
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      {/* <p>This is just an example.</p> */}
      <Map
        className="w-full h-full"
        defaultCenter={{ lat: 44.5618, lng: -123.2823 }}
        defaultZoom={15}
        mapId={"4f6dde3310be51d7"}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <div className="absolute top-4 left-4 p-2 w-1/4 rounded-lg shadow-lg ring-2 ring-white">
          <div className="grid grid-cols-2 gap-4">
            <h1 className="col-span-2 text-lg font-semibold text-white">
              DamStudy
            </h1>
            <h2 className="col-span-2 font-semibold text-white">
              Search for a study room
            </h2>
            <div className="col-span-2">
              <Input
                disabled
                type="text"
                placeholder="Search is coming soon!"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <Button variant="secondary" className="w-full">
                Search
              </Button>
            </div>
            <ScrollArea className="col-span-2 h-96">
              {studyRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </ScrollArea>
          </div>
        </div>
        <DeckGlOverlay layers={getDeckGlLayers(data)} />
      </Map>
    </APIProvider>
  );
}
