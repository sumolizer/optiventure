import Maps from "../components/maps";
import Forum from "../components/locationforum";
import { Navbar } from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mapscontainer flex">
        {/* Left Side: Google Maps */}
        <div className="flex-1 p-4">
          <img
            className=" rounded-xl "
            src="../public/mapsplaceholder.png"
            alt=""
          />
        </div>

        {/* Right Side: Forum */}
        <div className="flex-1 p-4">
          <Forum />
        </div>
      </div>
    </>
  );
}

export default Home;
