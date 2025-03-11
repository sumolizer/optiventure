import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 200px)", // Responsive height
};

// Default location: Islamabad, Pakistan
const defaultCenter = {
  lat: 33.6844,
  lng: 73.0479,
};

// Known business locations (simulated dataset)
const knownLocations = [
  { lat: 33.7, lng: 73.05, name: "Business 1" },
  { lat: 33.71, lng: 73.06, name: "Business 2" },
  { lat: 33.695, lng: 73.04, name: "Business 3" },
];

// Islamabad Capital Territory (ICT) boundaries (approximate)
const ICT_BOUNDARIES = {
  north: 33.75,
  south: 33.62,
  east: 73.18,
  west: 72.92,
};

function Maps() {
  const [selected, setSelected] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [searchInput, setSearchInput] = useState("");

  // Check if a location is within ICT boundaries
  const isWithinICT = (lat, lng) => {
    return (
      lat <= ICT_BOUNDARIES.north &&
      lat >= ICT_BOUNDARIES.south &&
      lng <= ICT_BOUNDARIES.east &&
      lng >= ICT_BOUNDARIES.west
    );
  };

  // Move to nearest known location
  const moveToNearestLocation = (lat, lng) => {
    let closest = null;
    let minDistance = Number.MAX_VALUE;

    knownLocations.forEach((location) => {
      const distance = Math.sqrt(
        Math.pow(location.lat - lat, 2) + Math.pow(location.lng - lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closest = location;
      }
    });

    if (closest) {
      setCurrentLocation({ lat: closest.lat, lng: closest.lng });
      setSelected(closest);
    }
  };

  // Handle user clicking on the map
  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    if (!isWithinICT(clickedLat, clickedLng)) {
      alert("Area out of coverage");
      return;
    }

    moveToNearestLocation(clickedLat, clickedLng);
  };

  // Handle searching an address
  const handleSearch = async () => {
    if (!searchInput) return;

    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchInput
    )}&key=AIzaSyB5KmMzJ4UbdeAB4Ce-nIEaJ5VqgMUPZas`;

    try {
      const response = await fetch(geocodeURL);
      const data = await response.json();
      if (data.results.length === 0) {
        alert("Location not found!");
        return;
      }

      const { lat, lng } = data.results[0].geometry.location;

      if (!isWithinICT(lat, lng)) {
        alert("Area out of coverage");
        return;
      }

      moveToNearestLocation(lat, lng);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB5KmMzJ4UbdeAB4Ce-nIEaJ5VqgMUPZas">
      <div className="flex flex-col items-center mb-4">
        {/* Search Input */}
        {/* <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter location..."
          className="p-2 rounded border w-80"
        />
        <button
          className="mt-2 bg-blue-600 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Search Location
        </button> */}
      </div>

      {/* Google Maps */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={13}
        onClick={handleMapClick}
      >
        {/* Display markers for known locations */}
        {knownLocations.map((location, index) => (
          <Marker
            key={index}
            position={location}
            onClick={() => setSelected(location)}
          />
        ))}

        {/* Show InfoWindow if a marker is clicked */}
        {selected && (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>Details about {selected.name}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
