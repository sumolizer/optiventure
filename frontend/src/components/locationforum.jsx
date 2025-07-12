import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
function LocForum({
  locationForAnalysis,
  onSearch,
  triggerAnalysis,
  resetTrigger,
}) {
  const [location, setLocation] = useState("");
  const [top10, setTop10] = useState([]);
  const [analysisMode, setAnalysisMode] = useState(false);
  const navigate = useNavigate();
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
  const handleRedirect = (businesses) => {
    const reportData = {
      businesses: businesses,
    };
    navigate("/reports", { state: reportData });
  };
  const performAnalysis = async () => {
    console.log("performAnalysis called with:", locationForAnalysis);
    try {
      console.log(locationForAnalysis.lat, locationForAnalysis.lng);

      // Initialize the Gemini AI client - using import instead of require
      // Make sure to add this import at the top of your file:
      // import { GoogleGenerativeAI } from "@google/generative-ai";
      const apiKey = "AIzaSyDTaMh_Lje1Y0MwygHYKx8AShNR18lORfo";
      const genAI = new GoogleGenerativeAI(apiKey);

      // Create model instance
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-05-20",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      // Construct the prompt with the current location
      const prompt = `
You are a data analyst AI with access to Google Maps and location intelligence. Your task is to recommend 10 realistic business ideas based on the business landscape in a 750-meter radius around the given coordinates in Pakistan.

Instructions:
- Analyze nearby businesses using Google Maps data.
- Use real local trends if possible.
- Calculate Success Probability (SP) using:
  - Higher number of reviews = Higher Demand
  - More businesses of same type = Higher Saturation
- Sort by success probability  
- No mobile phone repair shop, no pet grooming business

Return output strictly in raw JSON only. Do not explain or wrap the response.

Input:
Latitude: ${locationForAnalysis.lat}
Longitude: ${locationForAnalysis.lng}
Radius: 750 meters

Respond using this exact structure:
{
  "top_10": [
    {
      "businessName": "Example: Juice Bar",
      "description": "Why this business fits the location based on current demand/saturation.",
      "feasibility": "Brief explanation using SP formula",
      "successRate": 83.97
    },
    // 9 more
  ]
}
`;
      // Generate content from Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log("Raw text response:", text);

      // Parse the JSON response
      try {
        const jsonResponse = JSON.parse(text);
        console.log("Parsed JSON:", jsonResponse);
        const data = jsonResponse.top_10 || [];
        const reportData = {
          businesses: data,
          location: {
            lat: locationForAnalysis.lat,
            lng: locationForAnalysis.lng,
          },
          timestamp: new Date().toISOString(),
        };
        sessionStorage.setItem(
          "businessReportData",
          JSON.stringify(reportData)
        );

        setTop10(data);
        setAnalysisMode(true);
        console.log(data);
        resetTrigger(); // Reset after successful analysis
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        console.error("Non-JSON response received:", text);
        alert("Failed to parse business suggestions.");
        resetTrigger(); // Reset on error
      }
    } catch (err) {
      console.error("Error generating business suggestions:", err);
      alert("Failed to generate business suggestions.");
      resetTrigger(); // Reset even on error
    }
    // try {
    //   console.log(locationForAnalysis.lat, locationForAnalysis.lng);
    //   const res = await axios.get(
    //     `https://cecf-34-136-94-177.ngrok-free.app/api/predict`,
    //     {
    //       params: {
    //         lat: locationForAnalysis.lat,
    //         lon: locationForAnalysis.lng,
    //       },
    //       headers: {
    //         "Content-Type": "application/json",
    //         "ngrok-skip-browser-warning": "true", // Add necessary headers
    //         // 'Authorization': 'Bearer YOUR_TOKEN', // If authorization is needed
    //       },
    //     }
    //   );
    //   console.log(res.data);

    //   const data = res.data.top_5 || [];
    //   setTop5(data);
    //   setAnalysisMode(true);
    //   console.log(data);
    //   resetTrigger(); // Reset after successful analysis
    // } catch (err) {
    //   console.error("Error fetching analysis:", err);
    //   alert("Failed to fetch business suggestions.");
    //   resetTrigger(); // Reset even on error
    // }
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
        <h2 className="text-xl font-bold mb-2 optifont nv-active">
          Analysis Report
        </h2>

        <div className="darkcontainer px-4">
          {top10.slice(0, 4).map((item, index) => (
            <div key={index} className="optifont  text-white p-2 m-1">
              <h5 className="text-sm font-semibold capitalize">
                {index + 1}. {item.businessName}
              </h5>
              <p className="text-xs font-light mt-2">
                Success Rate:{" "}
                <span className="font-semibold text-green-400">
                  {item.successRate}%
                </span>
              </p>
            </div>
          ))}
          <div className="mt-4 flex space-x-4">
            <button
              className="nv-active px-4 py-2 rounded"
              onClick={() => {
                const reportData = {
                  businesses: top10,
                  location: {
                    lat: locationForAnalysis.lat,
                    lng: locationForAnalysis.lng,
                  },
                  timestamp: new Date().toISOString(),
                };
                handleRedirect(reportData);
              }}
            >
              Generate Report
            </button>
            <button
              className="nv-inactive px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Form UI
  return (
    <div className="flex flex-col items-center text-center transition-all duration-300 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 optifont nv-active">
        Start Your Venture!
      </h2>

      <form className="flex flex-col items-center space-y-4">
        <label className="signlbl" htmlFor="location">
          Enter Location ( Or choose on the map)
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
      <br />
      <button className="greenish text-2xl text-white" onClick={handleAnalyse}>
        Analyse
      </button>

      {/* Debug info */}
    </div>
  );
}

export default LocForum;
