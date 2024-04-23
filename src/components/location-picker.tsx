import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

// Location Selector container style
const mapContainerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "8px",
};

// TODO: Type the props
const LocationPicker = ({ setSelectedLocation, selectedLocation }: any) => {
  const [loading, setLoading] = useState(true);

  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const [currentLocation, setCurrentLocation] = useState({
    lat: 44.5618,
    lng: -123.2823,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationEnabled(true);
      });

      if (navigator.permissions) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            setLocationEnabled(true);
          }
        });
      }
    } else {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "denied") {
          setLocationEnabled(false);
        }
      });
    }
  }, []);

  if (!locationEnabled && !loading) {
    return (
      <p>To select a location, enable location services in your browser.</p>
    );
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        clickableIcons={false}
        center={currentLocation}
        zoom={13}
        onClick={handleMapClick}
        onLoad={() => setLoading(false)}
      >
        {selectedLocation && <MarkerF position={selectedLocation} />}
      </GoogleMap>
      {selectedLocation && (
        <div className="mt-4">
          <p>Selected Location:</p>
          <p>
            Latitude: {selectedLocation.lat} <br /> Longitude:{" "}
            {selectedLocation.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
