import { z } from "zod";

const studyRoomSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  Image: z.string(),
  NoiseLevel: z.string(),
  Seats: z.number(),
  Technology: z.array(z.string()),
  Seating: z.string(),
  Location: z.string(),
  Coordinates: z.object({
    Latitude: z.number(),
    Longitude: z.number(),
  }),
});

export const GetRooms = z.array(studyRoomSchema);
