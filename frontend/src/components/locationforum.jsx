import React, { useState, useEffect } from "react";
import axios from "axios";

function LocForum({
  locationForAnalysis,
  onSearch,
  triggerAnalysis,
  resetTrigger,
}) {
  const [location, setLocation] = useState("");
  const [top5, setTop5] = useState([]);
  const [analysisMode, setAnalysisMode] = useState(false);
  const capitalizeFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // Debug logging
  useEffect(() => {
    console.log("LocForum - locationForAnalysis updated:", locationForAnalysis);
  }, [locationForAnalysis]);

  useEffect(() => {
    console.log("LocForum - triggerAnalysis updated:", triggerAnalysis);
  }, [triggerAnalysis]);

  // Watch for trigger changes from Maps component
  useEffect(() => {
    console.log(
      "Trigger useEffect - triggerAnalysis:",
      triggerAnalysis,
      "locationForAnalysis:",
      locationForAnalysis
    );

    if (
      triggerAnalysis &&
      locationForAnalysis?.lat &&
      locationForAnalysis?.lng
    ) {
      console.log("Triggering analysis with location:", locationForAnalysis);
      performAnalysis();
    }
  }, [triggerAnalysis, locationForAnalysis]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) return;
    onSearch(location);
  };

  const performAnalysis = async () => {
    console.log("performAnalysis called with:", locationForAnalysis);

    try {
      console.log(locationForAnalysis.lat, locationForAnalysis.lng);
      const res = await axios.get(
        `https://4082-34-171-188-148.ngrok-free.app/api/predict`,
        {
          params: {
            lat: locationForAnalysis.lat,
            lon: locationForAnalysis.lng,
          },
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // Add necessary headers
            // 'Authorization': 'Bearer YOUR_TOKEN', // If authorization is needed
          },
        }
      );
      console.log(res.data);

      const data = res.data.top_5 || [];
      setTop5(data);
      setAnalysisMode(true);
      console.log(data);
      resetTrigger(); // Reset after successful analysis
    } catch (err) {
      console.error("Error fetching analysis:", err);
      alert("Failed to fetch business suggestions.");
      resetTrigger(); // Reset even on error
    }
  };

  const handleAnalyse = async () => {
    console.log("handleAnalyse called with:", locationForAnalysis);

    if (
      !locationForAnalysis ||
      !locationForAnalysis.lat ||
      !locationForAnalysis.lng
    ) {
      return alert("Please select a location first.");
    }

    await performAnalysis();
  };

  const handleBack = () => setAnalysisMode(false);

  // Analysis UI
  if (analysisMode) {
    return (
      <div className="flex flex-col items-center text-center p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 optifont greenish">
          Analysis Report
        </h2>
        <div className="darkcontainer">
          {top5.map((item, index) => (
            <div
              key={index}
              className="optifont capitalize bg-gray-800 text-white rounded-lg p-2 my-1 shadow-lg"
            >
              <h5 className="text-lg font-semibold mb-2 capitalize">
                {index + 1}.{" "}
                {capitalizeFirstWord(item.business_type.replace("_", " "))}
                <p className="text-sm font-light">
                  Success Probability:{" "}
                  <span className="font-semibold">
                    {item.success_probability.toFixed(2)}%
                  </span>
                </p>
              </h5>
            </div>
          ))}
        </div>

        <button
          className="mt-6 p-2 w-40 rounded nv-inactive"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    );
  }

  // Default Form UI
  return (
    <div className="flex flex-col items-center text-center transition-all duration-300 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 optifont greenish">
        Start Your Venture!
      </h2>

      <form className="flex flex-col items-center space-y-4">
        <label className="signlbl" htmlFor="location">
          Enter Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          className="signinp w-80 p-2 rounded border"
        />

        <h6 className="text-white text-sm">
          *Only available in Islamabad Capital Territory as of now
        </h6>

        <button className="nv-inactive w-40 p-2 rounded" onClick={handleSearch}>
          Find Location
        </button>
      </form>

      <button className="nv-active text-2xl text-white" onClick={handleAnalyse}>
        Analyse
      </button>

      {/* Debug info */}
      <div className="mt-4 text-xs text-gray-400">
        <p>
          Current Location:{" "}
          {locationForAnalysis
            ? `${locationForAnalysis.lat}, ${locationForAnalysis.lng}`
            : "None"}
        </p>
        <p>Trigger Status: {triggerAnalysis ? "True" : "False"}</p>
      </div>
    </div>
  );
}

export default LocForum;
