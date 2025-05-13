import { NavLink } from "react-router-dom";
import "../assets/navbar.css";
import { auth } from "../firebase";

export function Navbar() {
  const user = auth.currentUser;

  return (
    <nav
      className="bg-blue-900 p-3 flex justify-between items-center w-full rounded border-blue-900"
      style={{
        backgroundImage: "url(./public/newnavbar.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Side: Logo */}
      <div className="flex items-center inline-block">
        <img
          src="./public/optiAbstractlogo.png"
          alt="OptiVenture Logo"
          className="h-13 w-10 rounded-full"
        />
        <span className="text-white text-2xl optifont">PTIVENTURE</span>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex space-x-4 flex-nowrap mr-80">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "btneuro py-1.5 px-3 active-link" : "btneuro py-1.5 px-3"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "btneuro py-1.5 px-3 active-link" : "btneuro py-1.5 px-3"
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "btneuro py-1.5 px-3 active-link" : "btneuro py-1.5 px-3"
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/forum"
          className={({ isActive }) =>
            isActive ? "btneuro py-1.5 px-3 active-link" : "btneuro py-1.5 px-3"
          }
        >
          Forum
        </NavLink>
      </div>

      {/* Right Side: Profile Section */}
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <img src="./public/mascot.png" className="h-10 w-10 rounded-full" />
            <span className="btngreen">
              {user.displayName}
              <NavLink
                to="/profile"
                className="btneuro text-black py-1 px-3 rounded-xl"
              >
                Profile
              </NavLink>
            </span>
          </>
        ) : (
          <NavLink to="/login" className="btnred">
            Not signed in
          </NavLink>
        )}
      </div>
    </nav>
  );
}
