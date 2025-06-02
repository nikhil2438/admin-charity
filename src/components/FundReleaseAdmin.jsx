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
      const res = await axios.get("http://localhost:5000/api/fundraisers/release-status");
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
      await axios.put(`http://localhost:5000/api/fundraisers/request-release/${id}`);
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
      await axios.put(`http://localhost:5000/api/fundraisers/release/${id}`);
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
    <div className="p-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Fund Release Management</h2>
      {fundraisers.length === 0 ? (
        <p className="text-gray-600">No fundraisers available.</p>
      ) : (
        fundraisers.map((f) => (
          <div
            key={f._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded mb-4"
          >
            <div>
              <h3 className="font-semibold text-lg">{f.name}</h3>
              <p className="text-sm text-gray-700">Cause: {f.cause}</p>
              <p className="text-sm text-gray-700">Amount: ₹{f.amount}</p>
              <p className="text-sm">
                Status:{" "}
                {f.isFundsReleased
                  ? "Funds Released"
                  : f.isReleaseRequested
                  ? "Pending Verification"
                  : "No Release Requested"}
              </p>
            </div>

            <div className="space-x-2">
              {!f.isReleaseRequested && !f.isFundsReleased && (
                <button
                  onClick={() => requestVerification(f._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Request Verification
                </button>
              )}

              {f.isReleaseRequested && !f.isFundsReleased && (
                <button
                  onClick={() => releaseFunds(f._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Release Funds
                </button>
              )}

              {f.isFundsReleased && (
                <span className="text-green-700 font-semibold">Funds Released ✔️</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FundReleaseAdmin;
