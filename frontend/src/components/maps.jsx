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

  // Handle map click to place a draggable marker
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

  // Handle the "Analyse" button click
  const handleAnalyse = () => {
    console.log("Maps - handleAnalyse called");
    console.log("Maps - currentLocation:", currentLocation);
    console.log("Maps - isLocationSelected:", isLocationSelected);

    if (!isLocationSelected || !currentLocation) {
      alert("Please select a location on the map!");
      return;
    }

    // Location should already be set, just trigger the analysis
    console.log("Maps - Triggering analysis");
    setTriggerAnalysis(true);
  };

  // Update location from LocForum search and move pin to the nearest location
  useEffect(() => {
    if (!searchLocation) return;

    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchLocation
    )}&key=AIzaSyBI7wu-K_I33H4dXbAHgjiahwMD6vRaj-k`;

    fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) return alert("❌ Location not found!");
        const { lat, lng } = data.results[0].geometry.location;
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
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, [searchLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBI7wu-K_I33H4dXbAHgjiahwMD6vRaj-k">
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
