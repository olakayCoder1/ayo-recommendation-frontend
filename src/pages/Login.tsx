import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import InputField from '../components/InputField';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto my-auto p-6 bg-white shadow-lg rounded-lg w-full sm:w-2/3 max-w-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name and Last Name */}
          <div className="grid gap-2 grid-cols-1 ">
            <InputField
              type="text"
              label="Email/Username"
              name="username"
              placeholder=''
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              type="password"
              label="Password"
              name="password"
              placeholder=''
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200">
            Login
            </button>
        </div>
        {/* add a link to the registration page */}
        <div className="text-center text-gray-600 text-sm">
          Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link>
        </div>
      </form>
      </div>
      
    </div>
  );
};

export default Login;
