import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DiagnosticoPage } from "./pages/DiagnosticoPage";
import { PosDiagnosticoPage } from "./pages/PosDiagnosticoPage";
import { ComunidadePage } from "./pages/ComunidadePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiagnosticoPage />} />
        <Route path="/agendamento" element={<PosDiagnosticoPage />} />
        <Route path="/comunidade" element={<ComunidadePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
