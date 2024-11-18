import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous error message

    try {
      // Send login request to the backend API
      const response = await axios.post('http://localhost:8081/api/login', {
        username,
        password,
      });

      // Check response data for success message
      if (response.data === 'Login successful') {
        alert('Login unSuccessful');
         // Navigate to the student page upon successful login
      } else {
        alert('Login Successful');
        navigate('student'); // Set error message for incorrect credentials
      }
    } catch (err) {
      // Handle network or server error
      if (err.response) {
        // Errors from the server
        setError(err.response.data.message || 'Login failed. Please try again later.');
      } else if (err.request) {
        // Errors due to network issues
        setError('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error("Login error:", err); // Log error for debugging
    }

    // Clear input fields
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="container mt-4">
        <form onSubmit={login}> {/* Add onSubmit handler to the form */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {/* Display error message if there is any */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
