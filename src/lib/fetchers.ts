import { API_BASE_URL } from "./constants";
import { StudyRoom } from "./types";
import { normalizeRoomData } from "./utils";
import { GetRooms } from "./zod";

export async function fetchStudyRooms(): Promise<StudyRoom[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    const parsedData = GetRooms.parse(data);
    return parsedData.map(normalizeRoomData);
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
}