import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (username: string, role: string) => {
  const SECRET_KEY = 'your-secret-key'; // For testing only, not secure for production

  const payload = {
    username,
    role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expiration (1 hour)
  };

  const token = jwt.sign(payload, SECRET_KEY); // Generate the token
  return token;
};
