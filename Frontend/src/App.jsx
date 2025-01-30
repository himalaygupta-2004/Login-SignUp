import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import 'react-toastify/ReactToastify.css';
import { useState } from 'react';
import Refres from './Refres';

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <Refres setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
