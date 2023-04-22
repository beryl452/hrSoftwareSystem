import React from "react";
import {Navigate, Route} from "react-router-dom";
import Login from "../login.jsx";

function ProtectedRoute({ children }) {
    return localStorage.getItem('token') ? <>{children}</>
                                                : <Navigate to="/login" />;
}
export default ProtectedRoute