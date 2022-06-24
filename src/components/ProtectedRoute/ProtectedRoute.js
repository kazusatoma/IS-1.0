import { Route, Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("user")) {
    return children
  } else {
    return <Navigate to="/login" replace />;
  }
}