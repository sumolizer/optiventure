import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF as Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Default center: Islamabad, Pakistan
const defaultCenter = { lat: 33.6844, lng: 73.0479 };

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 200px)",
};

function Maps({ searchLocation, setLocationForAnalysis, setTriggerAnalysis }) {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [selected, setSelected] = useState(null);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const mapsapi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    console.log("Map clicked - lat:", lat, "lng:", lng);
    const newLocation = { lat, lng };
    setCurrentLocation(newLocation);
    setIsLocationSelected(true);
    setLocationForAnalysis(newLocation); // Also update locationForAnalysis immediately
  };

  const handleAnalyse = () => {
    console.log("Maps - handleAnalyse called");
    console.log("Maps - currentLocation:", currentLocation);
    console.log("Maps - isLocationSelected:", isLocationSelected);

    if (!isLocationSelected || !currentLocation) {
      alert("Please select a location on the map!");
      return;
    }
    console.log("Maps - Triggering analysis");
    setTriggerAnalysis(true);
  };

  useEffect(() => {
    if (!searchLocation) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        console.log("Geocode result - lat:", lat, "lng:", lng);

        // Set the current location
        setCurrentLocation({ lat, lng });
        setIsLocationSelected(true);

        // IMPORTANT: Also set this location for analysis
        setLocationForAnalysis({ lat, lng });
        console.log("Maps - Location set for analysis from search:", {
          lat,
          lng,
        });
      } else {
        console.error("Geocoder failed due to: " + status);
        alert("❌ Location not found!");
      }
    });
  }, [searchLocation]);

  return (
    <LoadScript googleMapsApiKey={mapsapi}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
        onClick={handleMapClick}
      >
        <Marker
          position={currentLocation}
          draggable={true}
          onDragEnd={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            console.log("Marker dragged - lat:", lat, "lng:", lng);
            const newLocation = { lat, lng };
            setCurrentLocation(newLocation);
            setIsLocationSelected(true);
            setLocationForAnalysis(newLocation); // Also update locationForAnalysis when dragging
          }}
        />

        {selected && (
          <InfoWindow
            position={{
              lat: selected.geometry.location.lat,
              lng: selected.geometry.location.lng,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>{selected.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <button onClick={handleAnalyse}>Analyse</button>

      {/* Debug info */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          padding: "5px",
          fontSize: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          Current Location: {currentLocation.lat}, {currentLocation.lng}
        </p>
        <p>Location Selected: {isLocationSelected ? "Yes" : "No"}</p>
      </div>
    </LoadScript>
  );
}

export default Maps;
