import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LocateIcon } from "lucide-react";
import { useState } from "react";

import { API_BASE_URL } from "@/lib/constants";

import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import LocationPicker from "./location-picker";
import RoomCard from "./room-card";

function formDataToObject(formData: FormData) {
  const object: Record<string, any> = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
}

export default function AddRoom() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [room, setRoom] = useState({
    id: 4,
    name: "KEC 1004 Study Room",
    image:
      "https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg",
    noiseLevel: "Quiet",
    seats: 4,
    technology: ["Whiteboard", "Projector"],
    seating: "Table",
    location: "KEC 1004",
    coordinates: {
      latitude: 44.5618,
      longitude: -123.2823,
    },
  });
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return addRoom(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-room-list"] });
    },
    onError: (error) => {
      console.error("Failed to add room:", error);
    },
  });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!selectedLocation) {
      toast.error("Please select a location");
      return;
    }
    mutation.mutate(data);
    handleCreateRoom();
  };
  async function addRoom(formData: FormData): Promise<any> {
    const coordinates = {
      latitude: selectedLocation?.lat,
      longitude: selectedLocation?.lng,
    };
    if (
      coordinates.latitude === undefined ||
      coordinates.longitude === undefined
    ) {
      throw new Error("Please select a location");
    }
    formData.append("latitude", coordinates.latitude.toString());
    formData.append("longitude", coordinates.longitude.toString());
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      body: JSON.stringify(formDataToObject(formData)),
    });
    if (!response.ok) {
      throw new Error("Failed to add room");
    }
    return response.json();
  }

  const handleCreateRoom = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (mutation.error) {
        setIsSubmitting(false);
        toast.error("Failed to add room");
        return;
      }

      setIsSubmitting(false);
      toast.success("Room added successfully!");
      navigate("/explore");
    }, 2000);
  };

  return (
    <>
      <div className="container py-12 text-left">
        <h1 className="text-4xl font-bold text-center">Add a Room</h1>
        <p className="text-center dark:text-muted-foreground text-secondary-foreground">
          Fill in the details below to add a new study room.
        </p>

        <div className="py-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form
              onSubmit={onSubmit}
              className="space-y-4 lg:col-span-3 lg:space-y-4 w-4/6 mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Room Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Room name</Label>
                  <Input
                    id="name"
                    name="name"
                    className={cn({
                      "border-red-500": mutation.variables?.get("name") === "",
                    })}
                    type="text"
                    placeholder="Enter room name"
                    value={room.name}
                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild className={cn("w-full")}>
                      <Button variant="outline">
                        <LocateIcon className="mr-2 scale-75" />
                        {selectedLocation
                          ? `${selectedLocation.lat}, ${selectedLocation.lng}`
                          : "Select location"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Study Room Location</DialogTitle>
                        <DialogDescription>
                          Select the location of the study room.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Location Picker */}
                      <LocationPicker
                        setSelectedLocation={setSelectedLocation}
                        selectedLocation={selectedLocation}
                      />
                      <DialogFooter>
                        <Button
                          onClick={() => setOpen(false)}
                          variant="outline"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="Enter image URL"
                    name="image"
                    type="text"
                    className={cn({
                      "border-red-500": mutation.variables?.get("image") === "",
                    })}
                    value={room.image}
                    onChange={(e) =>
                      setRoom({ ...room, image: e.target.value })
                    }
                  />
                </div>
                {/* Noise Level */}
                <div className="space-y-2">
                  <Label htmlFor="noiseLevel">Noise Level</Label>
                  <Input
                    id="noiseLevel"
                    type="text"
                    name="noiseLevel"
                    className={cn({
                      "border-red-500":
                        mutation.variables?.get("noiseLevel") === "",
                    })}
                    placeholder="Enter noise level"
                    value={room.noiseLevel}
                    onChange={(e) =>
                      setRoom({ ...room, noiseLevel: e.target.value })
                    }
                  />
                </div>
                {/* Seats */}
                <div className="space-y-2">
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    type="number"
                    id="seats"
                    name="seats"
                    className={cn({
                      "border-red-500": mutation.variables?.get("seats") === "",
                    })}
                    placeholder="Enter number of seats"
                    value={room.seats}
                    onChange={(e) =>
                      setRoom({ ...room, seats: parseInt(e.target.value) })
                    }
                  />
                </div>
                {/* Technology */}
                <div className="space-y-2">
                  <Label htmlFor="technology">Technology</Label>
                  <Input
                    id="technology"
                    type="text"
                    name="technology"
                    className={cn({
                      "border-red-500":
                        mutation.variables?.get("technology") === "",
                    })}
                    placeholder="Enter technology available"
                    value={room.technology.join(", ")}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        technology: e.target.value.split(", "),
                      })
                    }
                  />
                </div>
                {/* Seating */}
                <div className="space-y-2">
                  <Label htmlFor="seating">Seating Type</Label>
                  <Input
                    id="seating"
                    name="seating"
                    placeholder="Enter seating type"
                    className={cn({
                      "border-red-500":
                        mutation.variables?.get("seating") === "",
                    })}
                    type="text"
                    value={room.seating}
                    onChange={(e) =>
                      setRoom({ ...room, seating: e.target.value })
                    }
                  />
                </div>
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={room.location}
                    placeholder="Enter location"
                    type="text"
                    name="location"
                    className={cn({
                      "border-red-500":
                        mutation.variables?.get("location") === "",
                    })}
                    onChange={(e) =>
                      setRoom({ ...room, location: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* Action Buttons */}
              {mutation.error && (
                <p className="text-red-500">{mutation.error.message}</p>
              )}

              <div className="flex flex-row gap-2 items-center align-middle">
                {!isSubmitting && (
                  <Button size="lg" type="submit">
                    Submit
                  </Button>
                )}
                {isSubmitting && (
                  <Button disabled size="lg">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
              {/* Preview */}
              <div className="flex flex-col items-center justify-center">
                {showPreview && (
                  <>
                    <RoomCard room={room} className="h-min" />
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
