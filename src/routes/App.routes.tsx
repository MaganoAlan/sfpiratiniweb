import { Routes, Route } from "react-router-dom";
import { CancelLesson } from "../pages/CancelLesson";
import { Home } from "../pages/Home";
import { MyEvaluations } from "../pages/MyEvaluations";
import { SaturdayLesson } from "../pages/SaturdayLesson.tsx";
import { Water } from "../pages/Water";
import { Wellcome } from "../pages/Wellcome";
import { ExerciseList } from "../pages/ExerciseList";
import { Payment } from "../pages/Payment";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Wellcome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/aula-de-sabado" element={<SaturdayLesson />} />
      <Route path="/cancelar-aula" element={<CancelLesson />} />
      <Route path="/minhas-avaliacoes" element={<MyEvaluations />} />
      <Route path="/water" element={<Water />} />
      <Route path="/lista-exercicios" element={<ExerciseList />} />
      <Route path="/pagamento" element={<Payment />} />
    </Routes>
  );
}
