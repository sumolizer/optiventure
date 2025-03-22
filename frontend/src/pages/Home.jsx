import Maps from "../components/maps";
import Forum from "../components/locationforum";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LocForum from "../components/locationforum";

function Home() {
  const { user } = useAuth();
  const [searchLocation, setSearchLocation] = useState(null);

  // Function to update location when Forum's search button is clicked
  const handleSearchLocation = (location) => {
    setSearchLocation(location);
  };

  return (
    <>
      <Navbar />
      {!user ? (
        <p className="Signlog bg-red-700 text-yellow-50 rounded-full inline-block p-1 px-2 mx-9">
          Please <a href="/login">Login</a> to continue.
          <br />
          <br /> You can still browse the Forum
        </p>
      ) : (
        <div className="mapscontainer">
          {/* Left Side: Google Maps */}
          <div className="maps">
            <Maps searchLocation={searchLocation} />
          </div>

          {/* Right Side: Forum */}
          <div className="forum">
            <LocForum onSearch={handleSearchLocation} />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
