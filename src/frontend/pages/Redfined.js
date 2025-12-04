import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiArrowLeft, FiLogIn } from 'react-icons/fi';
import '../assets/Redfined.css';

const background = require('../assets/images/backgroundweb.jpg');

function Redfined() {
  const navigate = useNavigate();

  return (
    <div className="redefined-container">
      <div 
        className="redefined-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="redefined-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="redefined-back-button"
        >
          <FiArrowLeft className="redefined-back-icon" />
        </button>

        <main className="redefined-main-content">
          <div className="redefined-header">
            <h1 className="redefined-logo">
              <span className="redefined-logo-gradient">CLASH</span>
              <span className="redefined-logo-highlight">HUB</span>
            </h1>
            <p className="redefined-subtitle">Senha redefinida</p>
          </div>

          <div className="redefined-card">
            <div className="redefined-success-icon-container">
              <div className="redefined-success-icon-circle">
                <FiCheckCircle className="redefined-success-icon" />
                <div className="redefined-icon-glow" />
              </div>
            </div>

            <div className="redefined-card-header">
              <h2 className="redefined-card-title">Senha Redefinida!</h2>
              <p className="redefined-card-subtitle">
                Sua senha foi redefinida com sucesso
              </p>
            </div>

            <div className="redefined-success-message">
              <p className="redefined-message-text">
                Agora você pode fazer login com sua nova senha
              </p>
            </div>

            <div className="redefined-actions-container">
              <button 
                onClick={() => navigate("/")}
                className="redefined-login-button"
              >
                <FiLogIn className="redefined-button-icon" />
                <span className="redefined-button-text">Fazer Login</span>
              </button>

              <div className="redefined-info-box">
                <p className="redefined-info-text">
                  Lembre-se de usar uma senha segura e não compartilhá-la com ninguém
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Redfined;