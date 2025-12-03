import { Routes, Route } from "react-router-dom";
import App from "./App";          // Aqui VOCÊ usa App, então importe App
import Register from "./frontend/pages/Register";
import Homepg from "./frontend/pages/Homepg"; 
import Redfine from "./frontend/pages/Redfine"; 
import RedfineCod from "./frontend/pages/RedfineCod"; 
import RedfinePassword from "./frontend/pages/RedfinePassword"; 
import Redfined from "./frontend/pages/Redfined"; 
import HomePlayer from "./frontend/pages/HomePlayer";


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepg/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Homepg" element={<Homepg />} />
      <Route path="/Redfine" element={<Redfine />} />
      <Route path="/RedfineCod" element={<RedfineCod />} />
      <Route path="/RedfinePassword" element={<RedfinePassword/>} />
      <Route path="/Redfined" element={<Redfined/>} />
      <Route path="/HomePlayer" element={<HomePlayer/>} />

    </Routes>
  );
}
