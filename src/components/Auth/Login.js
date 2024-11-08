// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './../features/userSlice'; // Adjust path if needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:4000/api/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        
        console.log("Received Token:", token);
        // Dispatch the action to save user info and token in Redux
        dispatch(setUser({ user, token }));

        // Set the default Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log({ def: axios.defaults });
        // Redirect user to the home page
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mt-5">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
