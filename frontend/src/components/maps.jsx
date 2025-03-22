import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 200px)",
};

// Default: Islamabad, Pakistan
const defaultCenter = {
  lat: 33.6844,
  lng: 73.0479,
};

// Islamabad Capital Territory (ICT) boundaries (approximate)
const ICT_BOUNDARIES = {
  north: 33.75,
  south: 33.62,
  east: 73.18,
  west: 72.92,
};

function Maps({ searchLocation }) {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selected, setSelected] = useState(null);

  // Check if a location is within ICT boundaries
  const isWithinICT = (lat, lng) => {
    return (
      lat <= ICT_BOUNDARIES.north &&
      lat >= ICT_BOUNDARIES.south &&
      lng <= ICT_BOUNDARIES.east &&
      lng >= ICT_BOUNDARIES.west
    );
  };

  // Fetch nearby businesses when searchLocation changes
  useEffect(() => {
    if (!searchLocation) return;

    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchLocation
    )}&key=AIzaSyB5KmMzJ4UbdeAB4Ce-nIEaJ5VqgMUPZas`;

    fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          alert("❌ Location not found!");
          return;
        }

        const { lat, lng } = data.results[0].geometry.location;

        // 🔥 Check if the selected location is within ICT
        if (!isWithinICT(lat, lng)) {
          alert(
            "❌ Area out of coverage! Please select a location inside Islamabad."
          );
          return;
        }

        setCurrentLocation({ lat, lng });

        // Fetch nearby places
        fetchNearbyPlaces(lat, lng);
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, [searchLocation]);

  // Function to fetch nearby businesses from Google Places API
  const fetchNearbyPlaces = (lat, lng) => {
    const placesURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=AIzaSyB5KmMzJ4UbdeAB4Ce-nIEaJ5VqgMUPZas`;

    fetch(placesURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          alert("❌ No businesses found nearby!");
          return;
        }
        setNearbyPlaces(data.results);
      })
      .catch((error) => console.error("Error fetching nearby places:", error));
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB5KmMzJ4UbdeAB4Ce-nIEaJ5VqgMUPZas">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
      >
        {/* Mark the searched location */}
        <Marker position={currentLocation} />

        {/* Display nearby places */}
        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            onClick={() => setSelected(place)}
          />
        ))}

        {/* InfoWindow for selected place */}
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
    </LoadScript>
  );
}

export default Maps;
