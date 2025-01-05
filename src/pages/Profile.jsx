import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Bhavya Kothari",
    email: "bhavya.kothari@example.com",
    phone: "+91 9876543210",
    coins: 259,
    memberSince: "2023-01-01",
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md mb-5">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold">Profile</h2>
      </div>

      {/* Profile Information */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md">
        <div className="flex items-center mb-5">
          <img
            src="https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050663/profile_cidlht.png"
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-400 text-sm">Member since {profile.memberSince}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Email</span>
            <span className="font-semibold">{profile.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Phone</span>
            <span className="font-semibold">{profile.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Coins</span>
            <span className="font-semibold text-yellow-400">💰 {profile.coins}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => alert("Edit profile functionality coming soon!")}
          className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg shadow-md transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
