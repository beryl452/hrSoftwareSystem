import React from "react";
import { Navigate } from "react-router-dom";


interface DefaultLayoutProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: DefaultLayoutProps) {
    return (
      JSON.parse(localStorage.getItem('auth') || '{}').token !='' ? <>{children}</> : <Navigate to="/auth/signin" />
    );
}
export default ProtectedRoute