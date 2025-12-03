import { Routes, Route } from "react-router-dom";
import App from "./App";          
import Register from "./frontend/pages/Register";
import Homepg from "./frontend/pages/Homepg"; 
import Redfine from "./frontend/pages/Redfine"; 
import RedfineCod from "./frontend/pages/RedfineCod"; 
import RedfinePassword from "./frontend/pages/RedfinePassword"; 
import Redfined from "./frontend/pages/Redfined"; 
<<<<<<< HEAD
import Registerid from './frontend/pages/Registerid';  
import HomeDecker from './frontend/pages/HomeDecker';
=======
import HomePlayer from "./frontend/pages/HomePlayer";

>>>>>>> 9c6dfd1dfcecf3e6741ccad370ae9ba1aaef0da8

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepg/>} />
      <Route path="/HomeDecker" element={<HomeDecker/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Homepg" element={<Homepg />} />
      <Route path="/Redfine" element={<Redfine />} />
      <Route path="/RedfineCod" element={<RedfineCod />} />
      <Route path="/RedfinePassword" element={<RedfinePassword/>} />
      <Route path="/Redfined" element={<Redfined/>} />
<<<<<<< HEAD
      <Route path="/Registerid" element={<Registerid />} /> {/* Note: path minúsculo */}
=======
      <Route path="/HomePlayer" element={<HomePlayer/>} />

>>>>>>> 9c6dfd1dfcecf3e6741ccad370ae9ba1aaef0da8
    </Routes>
  );
}