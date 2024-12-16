import { useState, useEffect } from "react";
import "./index.css";

export function Logo() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 322000); // Change loading duration as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logo-container">
      <img
        src="./public/optiHaLFlogo.png"
        alt="OptiVenture Logo"
        className={`h-16 w-16 ${isLoading ? "spin-logo" : ""}`}
      />
    </div>
  );
}
