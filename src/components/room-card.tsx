import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Room {
  id: number;
  name: string;
  image: string;
  location: string;
  seats: number;
  noiseLevel: string;
  technology: string[];
  seating: string;
}

interface RoomCardProps {
  room: Room;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, className, ...props }) => {
  const navigate = useNavigate();
  return (
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
        <CardDescription className="grid grid-cols-1 gap-4 p-4">
          <p className="w-full text-center font-bold text-lg mb-2">
            Located at {room.location}
          </p>
          <p className="col-span-1 font-medium">• {room.seats} seats</p>
          <p className="col-span-1 font-medium">
            • {room.noiseLevel} noise level
          </p>
          <div className="col-span-1">
            <p className="font-medium mb-1">Technology:</p>
            <ul className="list-disc list-inside">
              {room.technology.map((tech) => (
                <li key={tech} className="ml-5">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <p className="col-span-1 font-medium">• {room.seating} seating</p>
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
  );
};

export default RoomCard;
