import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar" element={<SignUp />} />
    </Routes>
  );
}
