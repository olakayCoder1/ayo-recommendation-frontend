import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import VideoTopPick from '../components/VideoTopPick';
import ArticlesTopPick from '../components/ArticlesTopPick';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    // If there's no user (not logged in), redirect to the login page
    return <Navigate to="/login" />; // Redirect using Navigate instead of Redirect
  }

  // Get today's date in the format: Monday, October 23, 2024
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div>

        <h1 className=' text-3xl font-medium'>Hi, {user?.first_name}!</h1>
        <p className=" text-sm">{todayDate}</p>

      </div>
     
     <VideoTopPick />
     <ArticlesTopPick />
    </div>
  );
};

export default Home;
