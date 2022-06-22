import React from "react";
import Sandbox from "./pages/Sandbox/Sandbox";
import Login from "./pages/Login/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom";

export default function App() {
  return (
  <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Sandbox/>}/>
      </Routes>
  </BrowserRouter>
  );
}