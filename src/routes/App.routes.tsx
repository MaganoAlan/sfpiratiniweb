import { Routes, Route } from "react-router-dom";
import { CancelLesson } from "../pages/CancelLesson";
import { Home } from "../pages/Home";
import { MyEvaluations } from "../pages/MyEvaluations";
import { SaturdayLesson } from "../pages/SaturdayLesson.tsx";
import { Wellcome } from "../pages/Wellcome";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Wellcome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/aula-de-sabado" element={<SaturdayLesson />} />
      <Route path="/cancelar-aula" element={<CancelLesson />} />
      <Route path="/minhas-avaliacoes" element={<MyEvaluations />} />
    </Routes>
  );
}
