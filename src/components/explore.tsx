import { useEffect, useState } from "react";

import { APIProvider, Map, Marker, InfoWindow, AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGlOverlay } from "./deckgl-overlay";

// Data source from the deck.gl documentation
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json";

import { cn } from "@/lib/utils";
import type { Feature, GeoJSON } from "geojson";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

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

interface StudyRoom {
  id: number;
  name: string;
  image: string;
  noiseLevel: string;
  seats: number;
  technology: string[];
  seating: string;
  location: string;
  latitude: number;
  longitude: number;
}

const studyRooms: StudyRoom[]= [
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
    latitude: 44.56706903872953,
    longitude: -123.27873483900234
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
    location: "Callahan Hall",
    latitude: 44.56405361514414, 
    longitude: -123.27332126635314
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
    latitude: 44.567019861369495, 
    longitude: -123.27914909750905
  },
  {
    id: 4,
    name: "KEC 1005 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
    latitude: 44.567129397791945, 
    longitude: -123.27918257533415
  },
  {
    id: 5,
    name: "KEC 1001 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "Kelley Engineering Center",
    latitude: 44.56701370415376, 
    longitude: - 123.2790032662755
  },
];



type CardProps = React.ComponentProps<typeof Card>;

export function ExplorePage({ className, ...props }: CardProps) {
  const [data, setData] = useState<GeoJSON | null>(null);
  const [testData, setTestData] = useState<StudyRoom[]>(studyRooms);
  const navigate = useNavigate();

  const contentString = "<div>KEC 1001 Study Room</div>";
  

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => setData(data as GeoJSON));
  }, []);


  const [room, setRoom] = useState<StudyRoom | null>(null);

  const handleMarkerClick = (room: StudyRoom) => {
    setRoom(room);
  };

  const handleCloseClick = () => {
    setRoom(null);
  };
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
        {testData.map((room) => {
          return (
            <AdvancedMarker
              key={room.id}
              position={{ lat: room.latitude, lng: room.longitude }}
              onClick={() => handleMarkerClick(room)}
            />
          )
        })}
        {room && (
        <InfoWindow
          position={{ lat: room.latitude, lng: room.longitude }}
            onCloseClick={handleCloseClick}
        >
          <div className=" text-black">{room.name}</div>
        </InfoWindow>
      )}
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
              {testData.map((room) => (
                <Card className={cn("w-full", className)} {...props}>
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={room.image}
                      alt={room.name}
                      className="object-cover min-w-full h-full rounded-sm"
                    />
                    <CardDescription
                      className={cn("grid grid-cols-2 gap-2 mt-2 w-full")}
                    >
                      <p className="w-full whitespace-nowrap text-center">
                        Located at {room.location}
                      </p>
                      <br />
                      <p className="col-span-1">• {room.seats} seats</p>
                      <p className="col-span-1">
                        • {room.noiseLevel} noise level
                      </p>
                      <ul className="col-span-1">
                        <p>Technology:</p>
                        {room.technology.map((tech) => (
                          <li key={tech} className="mr-2">
                            • {tech}
                          </li>
                        ))}
                      </ul>
                      <p className="col-span-1">• {room.seating} seating</p>
                    </CardDescription>
                  </CardContent>
                  <Separator />
                  <CardFooter className={cn("mt-2")}>
                    <Button
                      variant="link"
                      onClick={() => navigate(`/study-room/${room.id}`)}
                    >
                      View
                    </Button>
                    <Button variant="link">Update Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </div>
        <DeckGlOverlay layers={getDeckGlLayers(data)} />
      </Map>
    </APIProvider>
  );
}
