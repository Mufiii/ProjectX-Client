import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VendorRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Correct hook for navigation

  // Ensure that the user object is available and user is a vendor
  if (!user || !user.is_vendor) {
    navigate('/login'); // Redirect to login if user is not a vendor or not logged in
    return null; // Return null to prevent rendering children
  }

  // Render children if user is a vendor
  return <>{children}</>;
};

export default VendorRouter;
