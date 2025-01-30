import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';
function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'username' || name === 'email' || name === 'password') {
      setSignupInfo({ ...signupInfo, [name]: value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupInfo.username || !signupInfo.email || !signupInfo.password) {
      return handleError('All fields are Required');
    }
    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      if (response.status === 409) {
        handleError('Username or email is already taken');
      } else if (response.ok) {
        const result = await response.json();
        console.log(result);
        const { success, message, err } = result;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else if (err) {
          const errorMessage = err?.details?.[0]?.message;
          handleError(errorMessage || 'An error occurred');
        } else {
          handleError(message || 'An error occurred');
        }
      } else {
        handleError('An error occurred');
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container">
      <h1>Sign-Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            autoFocus
            placeholder="Enter your username"
            value={signupInfo.username}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your Mail id"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your pass"
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already Have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
