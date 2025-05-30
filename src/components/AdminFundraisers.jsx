import React, { useEffect, useState } from "react";

const AdminFundraisers = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch fundraisers
  const fetchFundraisers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fundraisers");
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
      const res = await fetch(`http://localhost:5000/api/fundraisers/${id}`, {
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fundraiser Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : fundraisers.length === 0 ? (
        <p>No fundraiser submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Cause</th>
                <th className="py-2 px-4 border-b">Fund (₹)</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fundraisers.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.contact}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.cause}</td>
                  <td className="py-2 px-4 border-b">{item.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : item.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() => updateStatus(item._id, "approved")}
                      disabled={updatingId === item._id || item.status === "approved"}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        item.status === "approved"
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {updatingId === item._id && item.status !== "approved" ? "Updating..." : "Accept"}
                    </button>
                    <button
                      onClick={() => updateStatus(item._id, "rejected")}
                      disabled={updatingId === item._id || item.status === "rejected"}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        item.status === "rejected"
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {updatingId === item._id && item.status !== "rejected" ? "Updating..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFundraisers;
