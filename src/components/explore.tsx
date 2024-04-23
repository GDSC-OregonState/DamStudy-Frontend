import { useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
} from "@vis.gl/react-google-maps";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeckGlOverlay } from "./deckgl-overlay";

import { useQuery } from "@tanstack/react-query";

import { DATA_URL, GOOGLE_MAPS_API_KEY } from "@/lib/constants";
import { fetchStudyRooms } from "@/lib/fetchers";
import { cn, getDeckGlLayers } from "@/lib/utils";
import type { GeoJSON } from "geojson";
import { useNavigate } from "react-router-dom";
import { CardProps, StudyRoom } from "../lib/types";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";


export function ExplorePage({ className, ...props }: CardProps) {
  const [data, setData] = useState<GeoJSON | null>(null);
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["study-room-list"],
    queryFn: fetchStudyRooms,
  });
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
    rooms && (
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        {/* <p>This is just an example.</p> */}
        <Map
          className="w-full h-full"
          defaultCenter={{ lat: 44.5618, lng: -123.2823 }}
          defaultZoom={15}
          mapId={"4f6dde3310be51d7"}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {rooms.map((room) => {
            return (
              <AdvancedMarker
                key={room.id}
                position={{
                  lat: room.coordinates.latitude,
                  lng: room.coordinates.longitude,
                }}
                onClick={() => handleMarkerClick(room)}
              />
            );
          })}
          {room && (
            <InfoWindow
              position={{
                lat: room.coordinates.latitude,
                lng: room.coordinates.longitude,
              }}
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
                {isPending && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {rooms?.map((room: StudyRoom) => (
                  <Card
                    className={cn("w-full", className)}
                    {...props}
                    key={room.id}
                  >
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
                        <span className="col-span-1">• {room.noiseLevel}</span>
                        <span className="col-span-1">• {room.seats} seats</span>
                        <span className="col-span-2">• {room.location}</span>
                        <span className="col-span-2">
                          • {room.technology.join(", ")}
                        </span>
                        <span className="col-span-1">
                          • {room.seating} seating
                        </span>
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
    )
  );
}
