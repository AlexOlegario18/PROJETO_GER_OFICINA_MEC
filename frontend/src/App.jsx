import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import AdminPainel from "./components/AdminPainel";
import MecanicoPainel from "./pages/MecanicoPainel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPainel />} />
        <Route path="/mecanico" element={<MecanicoPainel />} />
      </Routes>
    </Router>
  );
}

export default App;