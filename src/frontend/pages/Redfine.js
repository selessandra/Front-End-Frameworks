import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft, FiSend, FiLock } from 'react-icons/fi';
import '../assets/Redfine.css';

const background = require('../assets/images/backgroundweb.jpg');

function Redfine() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      alert("Digite seu email!");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }
    
    navigate("/RedfineCod");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="redefine-container">
      <div 
        className="redefine-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="redefine-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="redefine-back-button back-button-hover"
        >
          <FiArrowLeft className="redefine-back-icon" />
        </button>

        <main className="redefine-main-content">
          <div className="redefine-header">
            <h1 className="redefine-logo">
              <span className="redefine-logo-gradient">CLASH</span>
              <span className="redefine-logo-highlight">HUB</span>
            </h1>
            <p className="redefine-subtitle">Recuperar senha</p>
          </div>

          <div className="redefine-card">
            <div className="redefine-card-header">
              <FiLock className="redefine-card-icon" />
              <h2 className="redefine-card-title">Redefinir Senha</h2>
              <p className="redefine-card-subtitle">
                Enviaremos um código de segurança para seu email
              </p>
            </div>

            <div className="redefine-info-box">
              <p className="redefine-info-text">
                Digite o email usado na criação da conta para receber o código de segurança. Use o código para redefinir sua senha!
              </p>
            </div>

            <div className="redefine-form-container">
              <div className="redefine-input-group">
                <label className="redefine-input-label">
                  <FiMail className="redefine-label-icon" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="redefine-input"
                />
                <div className="redefine-input-hint">
                  O código será enviado para este email
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!email}
                className={`redefine-send-button ${email ? 'send-button-hover' : ''}`}
                style={{ opacity: !email ? 0.5 : 1 }}
              >
                <FiSend className="redefine-button-icon" />
                <span className="redefine-button-text">Enviar Código</span>
              </button>

              <div className="redefine-login-container">
                <span className="redefine-login-text">Lembrou sua senha? </span>
                <Link to="/" className="redefine-login-link login-link-hover">
                  Voltar para o login
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Redfine;