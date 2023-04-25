import React from "react";
import {Navigate, Route} from "react-router-dom";

function ProtectedRoute({ children }) {
    return JSON.parse(localStorage.getItem('auth')) ? <>{children}</>
                                                : <Navigate to="/login" />;
}
export default ProtectedRoute