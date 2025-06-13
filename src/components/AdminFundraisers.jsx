import React, { useEffect, useState } from "react";

const AdminFundraisers = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchFundraisers = async () => {
    try {
      const res = await fetch("https://charity-backend-uj5e.onrender.com/api/fundraisers");
      const data = await res.json();
      setFundraisers(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch fundraisers", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`https://charity-backend-uj5e.onrender.com/api/fundraisers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setFundraisers((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating status");
    }
    setUpdatingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Fundraiser Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : fundraisers.length === 0 ? (
        <p>No fundraiser submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {fundraisers.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : item.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-2 space-y-1">
                <p>
                  <strong>Contact:</strong> {item.contact}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Cause:</strong> {item.cause}
                </p>
                <p>
                  <strong>Fund:</strong> ₹{item.amount}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(item._id, "approved")}
                  disabled={updatingId === item._id || item.status === "approved"}
                  
  className={`inline-flex items-center justify-center px-3 py-1 text-sm rounded text-white
  lg:px-2 lg:py-1 lg:text-[12px]
  ${
    item.status === "approved"
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
  >
                
                  {updatingId === item._id && item.status !== "approved"
                    ? "Updating..."
                    : "Accept"}
                </button>
                <button
                  onClick={() => updateStatus(item._id, "rejected")}
                  disabled={updatingId === item._id || item.status === "rejected"}
   className={`inline-flex items-center justify-center px-3 py-1 text-sm rounded text-white
  lg:px-2 lg:py-1 lg:text-[12px]
  ${
    item.status === "rejected"
      ? "bg-red-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}

                >
                  {updatingId === item._id && item.status !== "rejected"
                    ? "Updating..."
                    : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFundraisers;
 
