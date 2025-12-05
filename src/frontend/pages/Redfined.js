import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiArrowLeft, FiLogIn } from 'react-icons/fi';
import '../assets/Redfined.css';

const background = require('../assets/images/backgroundweb.jpg');

function Redfined() {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar dados de redefinição ao entrar nesta tela
    localStorage.removeItem("resetEmail");
    localStorage.removeItem("verifiedCode");
  }, []);

  return (
    <div className="redefined-container">
      <div 
        className="redefined-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="redefined-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="redefined-back-button back-button-hover"
        >
          <FiArrowLeft className="redefined-back-icon" />
        </button>

        <main className="redefined-main-content">
          <div className="redefined-header">
            <h1 className="redefined-logo">
              <span className="redefined-logo-gradient">CLASH</span>
              <span className="redefined-logo-highlight">HUB</span>
            </h1>
            <p className="redefined-subtitle">Sucesso!</p>
          </div>

          <div className="redefined-card">
            <div className="redefined-success-animation">
              <FiCheckCircle className="redefined-success-icon" />
              <div className="redefined-success-ring"></div>
            </div>

            <div className="redefined-card-header">
              <h2 className="redefined-card-title">Senha Redefinida!</h2>
              <p className="redefined-card-subtitle">
                Sua senha foi alterada com sucesso
              </p>
            </div>

            <div className="redefined-info-box">
              <p className="redefined-info-text">
                Agora você pode fazer login usando sua nova senha. Mantenha-a segura!
              </p>
            </div>

            <div className="redefined-actions">
              <Link to="/" className="redefined-login-button">
                <FiLogIn className="redefined-button-icon" />
                <span className="redefined-button-text">Fazer Login</span>
              </Link>

              <button 
                onClick={() => navigate("/")}
                className="redefined-home-button"
              >
                Voltar para Home
              </button>
            </div>

            <div className="redefined-security-tips">
              <h3 className="redefined-tips-title">Dicas de Segurança:</h3>
              <ul className="redefined-tips-list">
                <li>Não compartilhe sua senha com ninguém</li>
                <li>Use uma senha diferente para cada serviço</li>
                <li>Ative a autenticação em duas etapas</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Redfined;