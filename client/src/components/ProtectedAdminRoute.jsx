import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  if (!token || user.role !== 'admin') {
    // Redirect unauthorized users to admin login page
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
