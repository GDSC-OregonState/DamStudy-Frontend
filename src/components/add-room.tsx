import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import RoomCard from "./room-card";

export default function AddRoom() {
  const navigate = useNavigate();
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
  });
  const handleCreateRoom = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
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
            <div className="space-y-4 lg:col-span-3 lg:space-y-4 w-4/6 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Room Id */}
                <div className="space-y-2">
                  <Label htmlFor="id">Room ID</Label>
                  <Input
                    id="id"
                    placeholder="Enter room ID"
                    defaultValue="4"
                    onChange={(e) =>
                      setRoom({ ...room, id: parseInt(e.target.value) })
                    }
                  />
                </div>
                {/* Room Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Room name</Label>
                  <Input
                    id="name"
                    placeholder="Enter room name"
                    defaultValue="KEC 1004 Study Room"
                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                  />
                </div>
                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="Enter image URL"
                    defaultValue="https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg"
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
                    placeholder="Enter noise level"
                    defaultValue="Quiet"
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
                    placeholder="Enter number of seats"
                    defaultValue="4"
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
                    placeholder="Enter technology available"
                    defaultValue="Whiteboard, Projector"
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        technology: e.target.value.split(","),
                      })
                    }
                  />
                </div>
                {/* Seating */}
                <div className="space-y-2">
                  <Label htmlFor="seating">Seating Type</Label>
                  <Input
                    id="seating"
                    placeholder="Enter seating type"
                    defaultValue="Table"
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
                    placeholder="Enter location"
                    defaultValue="KEC 1004"
                    onChange={(e) =>
                      setRoom({ ...room, location: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-row gap-2 items-center align-middle">
                {!isSubmitting && (
                  <Button size="lg" onClick={handleCreateRoom}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
