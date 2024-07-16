import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return user?.roles?.find((role) => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
