import { NavLink } from "react-router-dom";
import "../assets/navbar.css";
import { auth } from "../firebase";

export function Crynavbar() {
  const user = auth.currentUser;

  return (
    <nav className="p-5 flex justify-between items-center w-full bg-[#050B2D] text-white shadow-md">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-1">
        <img
          src="./public/optiAbstractlogo.png"
          alt="OptiVenture Logo"
          className="h-12 w-10 rounded-full"
        />
        <span className="text-xl font-bold">PTIVENTURE</span>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-4">
        {[
          { name: "Home", to: "/" },
          { name: "Reports", to: "/reports" },
          { name: "Notes", to: "/notes" },
          { name: "Forum", to: "/forum" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nv-active" : "nv-inactive"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Login / Auth Button */}
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <img src="./public/mascot.png" className="h-10 w-10 rounded-full" />
            <span className="nv-inactive mx-2">
              {user.displayName}
              <NavLink to="/profile" className=" mx-2  nv-active">
                Profile
              </NavLink>
            </span>
          </>
        ) : (
          <NavLink to="/login" className="nv-inactive">
            Not signed in
          </NavLink>
        )}
      </div>
    </nav>
  );
}
