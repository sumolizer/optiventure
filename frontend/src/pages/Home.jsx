import Maps from "../components/maps";
import Forum from "../components/locationforum";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

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
            <Maps />
          </div>

          {/* Right Side: Forum */}
          <div className="forum">
            <Forum />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
