import { Card } from "@/components/ui/card";

export type CardProps = React.ComponentProps<typeof Card>;

export type StudyRoom = {
  id: string;
  name: string;
  image: string;
  noiseLevel: string;
  seats: number;
  technology: string[];
  seating: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};
