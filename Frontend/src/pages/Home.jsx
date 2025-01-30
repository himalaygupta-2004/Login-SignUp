import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);
  const handleLogout = (e) => {
    e.preventDefault(); // Add this to prevent default button behavior
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <ToastContainer />
    </div>
  );
}

export default Home;
