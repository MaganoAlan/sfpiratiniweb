import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { SaturdayLesson } from "../pages/SaturdayLesson.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aula-de-sabado" element={<SaturdayLesson />} />
    </Routes>
  );
}
