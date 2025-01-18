import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    // If there's no user (not logged in), redirect to the login page
    return <Navigate to="/login" />; // Redirect using Navigate instead of Redirect
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>Welcome, {user.username}! You are logged in as a {user.role}.</p>

      <div>
        <button onClick={logout}>Logout</button>
      </div>

      <p>Here is your personalized content based on your role and preferences.</p>
      {/* You can add more dynamic content here depending on user role, etc. */}
    </div>
  );
};

export default Home;
