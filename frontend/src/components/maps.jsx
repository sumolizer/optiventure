import { useState } from "react";
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

const center = {
  lat: 40.73061,
  lng: -73.935242,
};

function Maps() {
  const [selected, setSelected] = useState(null);
  const locations = [
    { lat: 40.73061, lng: -73.935242, name: "Location 1" },
    { lat: 40.75061, lng: -73.925242, name: "Location 2" },
    { lat: 40.72061, lng: -73.945242, name: "Location 3" },
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyD_GoogleDemoKey">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {locations.map((location, index) => (
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
