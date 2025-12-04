import { Routes, Route } from "react-router-dom";
import App from "./App";          
import Register from "./frontend/pages/Register";
import Redfine from "./frontend/pages/Redfine"; 
import RedfineCod from "./frontend/pages/RedfineCod"; 
import RedfinePassword from "./frontend/pages/RedfinePassword"; 
import Redfined from "./frontend/pages/Redfined"; 
import Registerid from './frontend/pages/Registerid';  
import HomeDecker from './frontend/pages/HomeDecker';
import HomePlayer from './frontend/pages/HomePlayer';
import Login from "./frontend/pages/Login";
import Options from "./frontend/pages/Options";
import DeleteAccount from "./frontend/pages/DeleteAccount";


export default function Router() {
  return (
    <Routes>
      <Route path="/HomeDecker" element={<HomeDecker/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/Redfine" element={<Redfine />} />
      <Route path="/RedfineCod" element={<RedfineCod />} />
      <Route path="/RedfinePassword" element={<RedfinePassword/>} />
      <Route path="/Redfined" element={<Redfined/>} />
      <Route path="/Registerid" element={<Registerid />} /> {/* Note: path minúsculo */}
      <Route path="/HomePlayer" element={<HomePlayer/>} />
      <Route path="/" element={<Login />} />
      <Route path="/Options" element={<Options />} />
      <Route path="/DeleteAccount" element={<DeleteAccount />} />
      
    </Routes>
  );
}