// src/components/Login.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory

type UserLoginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<UserLoginData>({
    email: '',
    password: '',
  });
  const history = useHistory(); // Initialize useHistory

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(loginData);
    history.push('/main'); // Navigate to the main page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <button className="form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
