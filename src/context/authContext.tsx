
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode  } from 'jwt-decode'; 

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {

  const BACKEND_URL = 'http://127.0.0.1:8000/api/v1'

  const [user, setUser] = useState(null);
  const [ authToken , setAuthToken ] = React.useState(()=> JSON.parse(localStorage.getItem('tokens'))|| null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile after the token is available or on token update
  const fetchUserProfile = async () => {
    if (!authToken || !authToken.access) return;
    
    try{
        const data = await fetchWithAuth({
          method: 'GET',
          path: `/account/`,
        });

        console.log(data)
        setUser(data?.data);
      }catch (error) {
      console.error('Error fetching user profile:', error);
    }

    // try {
    //   const response = await fetch(`${BACKEND_URL}/account/`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${authToken.access}`,
    //     },
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data)
    //     setUser(data?.data);
    //   } else {
    //     displayNotification('error', 'Failed to fetch user profile.');
    //   }
    // } catch (error) {
    //   console.error('Error fetching user profile:', error);
    //   displayNotification('error', 'An error occurred while fetching the profile.');
    // }
  };

  useEffect(() => {
    // Check if there's an auth token in localStorage and set the user on page load
    const token = localStorage.getItem('tokens');
    if (token) {
      fetchUserProfile()
    }
    setLoading(false);
  }, []); // This runs once on page load to check the token


  // useEffect(() => {
  //   if (authToken && !user) {
  //     fetchUserProfile();  // Fetch updated user profile if user exists but no profile is set
  //   }
  // }, [authToken]);


  // Mimicking the login API call to check username and assign role
  const login = async (email: string, password: string) => {
    const request_data = {
      email: email,
      password: password
    }
    try {
      const data = await fetchWithAuth({
        method: 'POST',
        path: `/auth/login`,
        body: request_data,
      });
      localStorage.setItem('tokens', JSON.stringify(data?.data?.tokens));
      setUser(data?.data?.user)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
  };

  function displayNotification(type: string, text: any ){
    if(type==='info'){
        toast.info(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else if(type==='success'){
        toast.success(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else if(type==='error'){
        toast.error(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }else{
        toast(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
  }


  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('user');    
    localStorage.removeItem('tokens');    
    window.location.href = '/login';
  };

  
  async function fetchWithAuth({ method = 'GET', path, queryParams = {}, body = null , isformData = false}) {
      const accessToken = authToken?.access
      const refreshToken = authToken?.refresh
      const REFRESH_TOKEN_URL = `${BACKEND_URL}/auth/token/refresh/`;
    
      // Build the full URL with query parameters if provided
      let url = `${BACKEND_URL}${path}`;
      if (Object.keys(queryParams).length > 0) {
        const query = new URLSearchParams(queryParams).toString();
        url = `${url}?${query}`;
      }
    
      const headers = {
        'Content-Type': 'application/json',
      };
    
      // Include the access token in the Authorization header if available
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
      // Make the initial API request
      let response;
      if(isformData){
        response = await fetch(url, { method, headers, body: body });
      }else{
        response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
      }
      
    
      // Check if the response is a 401 (Unauthorized) error (token might be expired)
      if (response.status === 401 && refreshToken) {
        try {
          // Attempt to refresh the token using the refresh token
          const refreshResponse = await fetch(REFRESH_TOKEN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });
    
          if (!refreshResponse.ok) {
            throw new Error('Unable to refresh token');
          }
    
          // Parse the new tokens from the response
          const refreshData = await refreshResponse.json();
          // Store the new tokens in localStorage
          localStorage.setItem('tokens', JSON.stringify(refreshData));
          setAuthToken(refreshData)
          // Retry the original request with the new access token
          headers['Authorization'] = `Bearer ${refreshData?.access}`;
          response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });

          if (!response.ok) {
            if(response.status === 400){
              const errorData = await response.json();
              displayNotification('error',errorData?.message)
              throw new Error(errorData?.message)
            }
            if(response.status === 401){
              deleteUserFromLocalStorage()
            }
            if(response.status === 500){
              const errorData = await response.json(); 
              displayNotification('error',errorData?.message)
            }
            throw new Error(`Error fetching data from ${path}: ${response.statusText}`);
          }

          return response.json();
        } catch (error) {
          console.error('Token refresh failed:', error);
          deleteUserFromLocalStorage()
          throw new Error('Authentication error. Please log in again.');
          
        }
      }

      console.log(response.ok)
      console.log(response.status)
      // If the response is not successful, throw an error
      if (!response.ok) {
        if(response.status === 201 || response.status === 204){
          return response.json();
        }
        // add 400 error handling
        if(response.status === 400){
          const errorData = await response.json();
          displayNotification('error',errorData?.message)
          throw new Error(errorData?.message)
        }
        if(response.status === 500){
          const errorData = await response.json(); 
          displayNotification('error',errorData?.message)
        }
        throw new Error(`Error fetching data from ${path}: ${response.statusText}`);
      }
    
      // Return the response JSON data
      return response.json();
    
  }


  

  // Logout function
const logout = () => {
    localStorage.removeItem('tokens');
    setUser(null);
    displayNotification('success', 'Logged out successfully');
    window.location.reload();
};

  // Check if user has required role
  const checkRole = (requiredRole: string) => {
    if (user && user.role) {
      return user.role === requiredRole;
    }
    return false;
  };

  const value = { user,authToken, login, logout, checkRole, fetchWithAuth,displayNotification,setUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
