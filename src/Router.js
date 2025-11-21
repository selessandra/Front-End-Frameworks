import { Routes, Route } from "react-router-dom";
import App from "./App";          // Aqui VOCÊ usa App, então importe App
import Register from "./frontend/pages/Register";
import Homepg from "./frontend/pages/Homepg"; 

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Homepg" element={<Homepg />} />
    </Routes>
  );
}
