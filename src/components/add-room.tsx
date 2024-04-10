import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
                  <Input id="id" placeholder="Enter room ID" defaultValue="4" />
                </div>
                {/* Room Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Room name</Label>
                  <Input
                    id="name"
                    placeholder="Enter room name"
                    defaultValue="KEC 1004 Study Room"
                  />
                </div>
                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="Enter image URL"
                    defaultValue="https://egis.umn.edu/studyspace_v2/studyspaceimages/10ChurchStreet-101.jpg"
                  />
                </div>
                {/* Noise Level */}
                <div className="space-y-2">
                  <Label htmlFor="noiseLevel">Noise Level</Label>
                  <Input
                    id="noiseLevel"
                    placeholder="Enter noise level"
                    defaultValue="Quiet"
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
                  />
                </div>
                {/* Technology */}
                <div className="space-y-2">
                  <Label htmlFor="technology">Technology</Label>
                  <Input
                    id="technology"
                    placeholder="Enter technology available"
                    defaultValue="Whiteboard, Projector"
                  />
                </div>
                {/* Seating */}
                <div className="space-y-2">
                  <Label htmlFor="seating">Seating Type</Label>
                  <Input
                    id="seating"
                    placeholder="Enter seating type"
                    defaultValue="Table"
                  />
                </div>
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
