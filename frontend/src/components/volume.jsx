import React, { useState } from "react";
import "./forum.css";

const RealWorldRectangle = () => {
  const [length, setLength] = useState(5); // Real-world length in meters
  const [breadth, setBreadth] = useState(2);

  // Scale factor: 1 meter = 10 pixels for visualization
  const scale = 10;

  const handleLengthChange = (e) => setLength(e.target.value);
  const handleBreadthChange = (e) => setBreadth(e.target.value);

  return (
    <div style={{ padding: "20px" }}>
      <div className="btn">
        <label>
          Length (m):
          <input type="number" value={length} onChange={handleLengthChange} />
        </label>
        <label>
          Breadth (m):
          <input type="number" value={breadth} onChange={handleBreadthChange} />
        </label>
      </div>
      <div
        style={{
          width: `${length * scale}px`,
          height: `${breadth * scale}px`,
          backgroundColor: "green",
          border: "1px solid grey",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            fontSize: "12px",
          }}
        >
          {length} m x {breadth} m
        </span>
      </div>
    </div>
  );
};

export default RealWorldRectangle;
