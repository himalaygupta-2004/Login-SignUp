import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'username' || name === 'email' || name === 'password') {
      setLoginInfo({ ...loginInfo, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!loginInfo.email || !loginInfo.password) {
      return handleError('All fields are Required');
    }
    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.status === 409) {
        handleError('Username or email is already taken');
      } else if (response.ok) {
        const result = await response.json();
        console.log(result);
        const { success, message, jwtToken, username, err } = result;
        if (success) {
          handleSuccess(message);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', username);
          setTimeout(() => {
            navigate('/home');
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
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your Mail id"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your pass"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't Have an account?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
