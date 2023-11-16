// Profile.tsx
import React, { useState, useEffect } from "react";

// Assuming your User type looks something like this
type User = {
  name: string;
  surname: string;
  dob: string;
  email: string;
  // ... other fields
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    // Here you would normally fetch the user info from the API
    // For now, we'll just set some dummy data after a delay to simulate an API call
    setTimeout(() => {
      setUserInfo({
        name: "John",
        surname: "Doe",
        dob: "1990-01-01",
        email: "john.doe@example.com",
        // ... other fields
      });
    }, 1000);
  }, []);

  // Render loading state until userInfo is set
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Render user info if we have it
  return (
    <div className="profile">
      <h1>Profile Information</h1>
      <p>Name: {userInfo.name}</p>
      <p>Surname: {userInfo.surname}</p>
      <p>Date of Birth: {userInfo.dob}</p>
      <p>Email: {userInfo.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Profile;
