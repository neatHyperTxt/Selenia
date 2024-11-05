import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';
function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute