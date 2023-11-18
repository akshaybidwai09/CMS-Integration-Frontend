import React, { useState, useEffect } from "react";
import "./Profile.css"; // Import the CSS file for Profile

type User = {
  id: string;
  firstName: string; // changed from firstName
  lastName: string; // changed from lastName
  dob: string;
  email: string;
};

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userProfile");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setError("No user information found. Please login again.");
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Format the date of birth if necessary
  const dob = new Date(userInfo.dob);
  const isValidDate = !isNaN(dob.getTime());
  const formattedDob = isValidDate ? dob.toLocaleDateString() : "Invalid Date";

  return (
    <div className="profile-card">
      <h1>Profile Information</h1>
      {userInfo && (
        <>
          <p>
            <span>ID:</span> {userInfo.id}
          </p>
          <p>
            <span>First Name:</span> {userInfo.firstName}
          </p>
          <p>
            <span>Last Name:</span> {userInfo.lastName}
          </p>
          <p>
            <span>Date of Birth:</span> {formattedDob}
          </p>
          <p>
            <span>Email:</span> {userInfo.email}
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
