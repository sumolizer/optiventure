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
        <div className="mapscontainer flex">
          {/* Left Side: Google Maps */}
          <div className="flex-1 p-4">
            <img
              className="rounded-xl"
              src="../public/mapsplaceholder.png"
              alt=""
            />
            {/* < Maps /> */}
          </div>

          {/* Right Side: Forum */}
          <div className="flex-1 p-4">
            <Forum />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
