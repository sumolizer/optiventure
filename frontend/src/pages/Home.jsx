import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Crynavbar } from "../components/crynavbar";
import Maps from "../components/maps";
import LocForum from "../components/locationforum";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const [searchLocation, setSearchLocation] = useState("");
  const [locationForAnalysis, setLocationForAnalysis] = useState(null);
  const [triggerAnalysis, setTriggerAnalysis] = useState(false);
  const navigate = useNavigate();
  // Function to update location when "Find Location" button in LocForum is clicked
  const handleSearchLocation = (location) => {
    console.log("Home - handleSearchLocation called with:", location);
    setSearchLocation(location);
  };

  // Debug logging for location changes
  console.log("Home - locationForAnalysis:", locationForAnalysis);
  console.log("Home - triggerAnalysis:", triggerAnalysis);

  return (
    <>
      <Crynavbar />
      {!user ? (
        <p className="Signlog bg-red-700 text-yellow-50 rounded-full inline-block p-1 px-2 mx-9">
          Please{" "}
          <a className="nv-active" href="/login">
            Login
          </a>{" "}
          to continue.
          <br />
          <br /> You can still browse the Forum
        </p>
      ) : (
        <div className="mapscontainer">
          {/* Left Side: Google Maps */}
          <div className="maps">
            <Maps
              searchLocation={searchLocation}
              setLocationForAnalysis={(loc) => {
                console.log("Home - Setting location for analysis:", loc);
                setLocationForAnalysis(loc);
              }}
              setTriggerAnalysis={(val) => {
                console.log("Home - Setting trigger analysis:", val);
                setTriggerAnalysis(val);
              }}
            />
          </div>

          {/* Right Side: Forum */}
          <div className="forum">
            <LocForum
              onSearch={handleSearchLocation}
              locationForAnalysis={locationForAnalysis}
              triggerAnalysis={triggerAnalysis}
              resetTrigger={() => {
                console.log("Home - Resetting trigger");
                setTriggerAnalysis(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
