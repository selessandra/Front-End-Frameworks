import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import Register from './frontend/pages/Register';
import Redfine from './frontend/pages/Redfine'; 
import RedfineCod from './frontend/pages/RedfineCod'; 
import RedfinePassword from './frontend/pages/RedfinePassword'; 
import Redfined from './frontend/pages/Redfined'; 
import RegisterId from './frontend/pages/Registerid';  // Note: Import correto
import HomeDecker from './frontend/pages/HomeDecker';
import HomePlayer from './frontend/pages/HomePlayer';
import Login from "./frontend/pages/Login";
import Options from "./frontend/pages/Options";
import DeleteAccount from "./frontend/pages/DeleteAccount";
import ProtectedRoute from './frontend/components/ProtectedRoute';
import './frontend/assets/App.css';

function App() {
  // Limpeza de dados temporários na inicialização
  useEffect(() => {
    const cleanupTempData = () => {
      const currentPath = window.location.pathname;
      
      // Limpa dados temporários apenas se não estiver no fluxo de registro
      if (!currentPath.includes('/register') && !currentPath.includes('/Redfine')) {
        localStorage.removeItem('temp_user_id');
        localStorage.removeItem('temp_user_data');
      }
    };

    cleanupTempData();
  }, []);

  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            {/* Rota Pública - Login */}
            <Route path="/" element={<Login />} />
            
            {/* Rotas Públicas - Registro e Redefinição */}
            <Route path="/Register" element={<Register />} />
            <Route path="/Redfine" element={<Redfine />} />
            <Route path="/RedfineCod" element={<RedfineCod />} />
            <Route path="/RedfinePassword" element={<RedfinePassword />} />
            <Route path="/Redfined" element={<Redfined />} />
            
            {/* Rotas Protegidas - Requer autenticação */}
            <Route 
              path="/Registerid" 
              element={
                <ProtectedRoute>
                  <RegisterId />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/HomePlayer" 
              element={
                <ProtectedRoute>
                  <HomePlayer />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/HomeDecker" 
              element={
                <ProtectedRoute>
                  <HomeDecker />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/Options" 
              element={
                <ProtectedRoute>
                  <Options />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/DeleteAccount" 
              element={
                <ProtectedRoute>
                  <DeleteAccount />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota curinga - redireciona para login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;