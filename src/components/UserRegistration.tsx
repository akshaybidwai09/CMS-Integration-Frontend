// src/components/UserRegistration.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory

type UserRegistrationData = {
  name: string;
  surname: string;
  dob: string; // date of birth
  email: string;
  password: string;
};

const UserRegistration: React.FC = () => {
  const [userData, setUserData] = useState<UserRegistrationData>({
    name: "",
    surname: "",
    dob: "",
    email: "",
    password: "",
  });
  const history = useHistory(); // Initialize useHistory

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
    history.push("/main"); // Navigate to the main page after registration
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="surname"
        value={userData.surname}
        onChange={handleInputChange}
        placeholder="Surname"
        required
      />
      <input
        type="date"
        name="dob"
        value={userData.dob}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <button className="form-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default UserRegistration;
