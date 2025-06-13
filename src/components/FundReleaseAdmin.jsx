// 
import React, { useEffect, useState } from "react";
import axios from "axios";

const FundReleaseAdmin = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFundraisers();
  }, []);

  const fetchFundraisers = async () => {
    try {
      const res = await axios.get("https://charity-backend-uj5e.onrender.com/api/fundraisers/release-status");
       console.log("Fundraisers fetched:", res.data); 
      setFundraisers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const requestVerification = async (id) => {
    try {
      await axios.put(`https://charity-backend-uj5e.onrender.com/api/fundraisers/request-release/${id}`);
      alert("Release requested, waiting for verification.");
      setFundraisers((prev) =>
        prev.map((f) => (f._id === id ? { ...f, isReleaseRequested: true } : f))
      );
    } catch (err) {
      alert("Failed to request release.");
    }
  };

  const releaseFunds = async (id) => {
    try {
      await axios.put(`https://charity-backend-uj5e.onrender.com/api/fundraisers/release/${id}`);
      alert("Funds released successfully.");
      setFundraisers((prev) =>
        prev.map((f) =>
          f._id === id ? { ...f, isFundsReleased: true, isReleaseRequested: false } : f
        )
      );
    } catch (err) {
      alert("Failed to release funds.");
    }
  };

  if (loading) return <p>Loading fundraisers...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-4xl mx-auto w-full">
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center md:text-left">
    Fund Release Management
  </h2>

  {fundraisers.length === 0 ? (
    <p className="text-gray-600 text-center">No fundraisers available.</p>
  ) : (
    fundraisers.map((f) => (
      <div
        key={f._id}
        className="flex flex-col md:flex-row justify-between md:items-center bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4 shadow-sm"
      >
        {/* Fundraiser Info */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-semibold text-lg text-gray-800">{f.name}</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Cause:</span> {f.cause}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Amount:</span> ₹{f.amount}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            {f.isFundsReleased
              ? "✅ Funds Released"
              : f.isReleaseRequested
              ? "⏳ Pending Verification"
              : "❌ No Release Requested"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {!f.isReleaseRequested && !f.isFundsReleased && (
            <button
              onClick={() => requestVerification(f._id)}
              className="bg-yellow-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Request Verification
            </button>
          )}

          {f.isReleaseRequested && !f.isFundsReleased && (
            <button
              onClick={() => releaseFunds(f._id)}
              className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Release Funds
            </button>
          )}

          {f.isFundsReleased && (
            <span className="text-green-700 font-semibold text-sm">
              Funds Released ✔️
            </span>
          )}
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default FundReleaseAdmin;
