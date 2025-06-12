import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XMarkIcon, UserIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const response = await axios.post("https://charity-backend-uj5e.onrender.com/api/user/profile", {
          email: email.toLowerCase(),
        });

        setUserData(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg text-gray-700">Loading profile...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl relative">
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        title="Close"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-3 mb-6">
        <UserIcon className="w-8 h-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium">{userData.FullName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{userData.Email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Mobile Number</p>
          <p className="text-lg font-medium">{userData.MobileNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">User Type</p>
          <p className="text-lg font-medium">{userData.usertype}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
