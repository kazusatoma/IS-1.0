import React from "react";
import Sandbox from "./pages/Sandbox/Sandbox";
import Login from "./pages/Login/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <ProtectedRoute>
              <Sandbox />
            </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}