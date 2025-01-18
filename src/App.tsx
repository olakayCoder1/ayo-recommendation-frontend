
import React from 'react';
import './index.css'; 
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import { AuthProvider, useAuth } from './context/authContext';  // Import useAuth
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import Unauthorized from './pages/Unauthorized';
import { Navigate } from 'react-router-dom'; // Correct import for Navigate
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Define all your routes within the <Routes> component */}

          {/* Public route for login with a check for unauthenticated users */}
          <Route path="/login" element={<UnauthenticatedRoute element={<Login />} />} />
          <Route path="/register" element={<UnauthenticatedRoute element={<Register />} />} />
          
          {/* Private Route for Home */}
          <Route path="/home/*" element={<PrivateRoute element={<Home />} />} />
          

          <Route path="/admin/*" element={<RoleBasedRoute element={<AdminPage />} requiredRole="admin" />} />
          
          {/* Unauthorized route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Redirect to home */}
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
