import { useEffect, useState } from "react";

const mockTopBusinesses = [
  { category: "bakery", lat: 40.7128, lng: -74.006 },
  { category: "pharmacy", lat: 40.7132, lng: -74.0052 },
  { category: "book_store", lat: 40.7141, lng: -74.0075 },
  { category: "gym", lat: 40.7153, lng: -74.0083 },
  { category: "cafe", lat: 40.716, lng: -74.0041 },
];

export default function BusinessSuggestionOverlay({ lat, lng, onClose }) {
  const [topBusinesses, setTopBusinesses] = useState([]);

  useEffect(() => {
    // Simulate fetching business suggestions based on lat/lng
    setTimeout(() => {
      setTopBusinesses(mockTopBusinesses);
    }, 500);
  }, [lat, lng]);

  return (
    <div className="rounded-xl fixed inset-0 bg-[#050B2D] text-white shadow-md bg-opacity-100 z-80 flex flex-col items-center justify-start p-6 overflow-y-auto w-full h-full overflow-x-hidden">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-white text-2xl font-bold pt-4 optifont nv-active ">
          Cuties
        </h1>

        {topBusinesses.map((biz, index) => (
          <div
            key={index}
            className="bg-blue-800 text-white border border-blue-700 rounded-xl p-4 nv-inactive"
          >
            <h2 className="text-lg font-semibold">
              {index + 1}. {biz.category}
            </h2>
            <p className="text-sm">Latitude: {biz.lat}</p>
            <p className="text-sm">Longitude: {biz.lng}</p>
          </div>
        ))}

        <button className="nv-active">Generate Report</button>
        <br />
        <button
          onClick={onClose}
          className="text-white mt-4 underline underline-offset-2 hover:text-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
