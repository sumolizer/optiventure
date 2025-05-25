import { Crynavbar } from "../components/crynavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Reports() {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Try to get data from React Router state first
    if (location.state) {
      console.log("Found data in location.state:", location.state);
      setReportData(location.state);
      return;
    }

    // Fallback to localStorage if React Router state isn't available
    const savedData = localStorage.getItem("businessReportData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Found data in localStorage:", parsedData);
        setReportData(parsedData);
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    }
  }, [location]);

  // Extract the businesses array safely
  const businesses = Array.isArray(reportData?.businesses)
    ? reportData.businesses
    : Array.isArray(reportData?.businesses?.businesses)
    ? reportData.businesses.businesses
    : [];

  // Show fallback screen if no valid data is found
  if (!reportData || businesses.length === 0) {
    return (
      <>
        <Crynavbar />
        <div className="Signlog m-5">
          <h1 className="nv-active">Generate from Home</h1>
          <br />
          <p className="optifont">
            Reports carry detailed business statistics about the area you
            selected!
          </p>
          <button
            onClick={() => navigate("/")}
            className="nv-inactive mt-4 px-4 py-2 rounded"
          >
            Go to Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Crynavbar />
      <div className="darlcontainer m-5">
        <h1 className="nv-active text-center">Business Opportunity Report</h1>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="optifont bg-gray-800 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between"
            >
              <h3 className="font-bold text-lg mb-2">
                {index + 1}. {business.businessName}
              </h3>
              <p className="text-sm mb-2">
                {business.feasibility} <br /> {business.description}
              </p>
              <p className="text-sm font-medium text-green-300">
                Success Rate: {business.successRate * 100}%
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="nv-inactive px-6 py-3 rounded-xl"
          >
            Back to Map
          </button>
        </div>
      </div>
    </>
  );
}

export default Reports;
