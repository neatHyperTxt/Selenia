import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
function ProtectedRoute() {
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated); 
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute