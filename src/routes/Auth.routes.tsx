import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ResetPassword } from "../pages/ResetPassword";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/recuperar-senha" element={<ResetPassword />} />
    </Routes>
  );
}
