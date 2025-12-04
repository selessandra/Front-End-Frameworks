import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiKey, FiArrowLeft, FiCheck, FiMail } from 'react-icons/fi';
import '../assets/RedfineCod.css';

const background = require('../assets/images/backgroundweb.jpg');

function RedfineCod() {
  const navigate = useNavigate();
  const [Codigo, setCodigo] = useState("");

  const handleSubmit = () => {
    if (!Codigo.trim()) {
      alert("Digite o código de verificação!");
      return;
    }
    
    if (Codigo.length !== 6) {
      alert("O código deve ter 6 dígitos!");
      return;
    }
    
    if (!/^\d+$/.test(Codigo)) {
      alert("Digite apenas números!");
      return;
    }
    
    navigate("/RedfinePassword");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setCodigo(value);
    }
  };

  return (
    <div className="redefine-cod-container">
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <FiArrowLeft className="back-icon" />
        </button>

        <main className="main-content">
          <div className="header">
            <h1 className="logo">
              <span className="logo-gradient">CLASH</span>
              <span className="logo-highlight">HUB</span>
            </h1>
            <p className="subtitle">Verificação de código</p>
          </div>

          <div className="card">
            <div className="card-header">
              <FiKey className="card-icon" />
              <h2 className="card-title">Código de Verificação</h2>
              <p className="card-subtitle">
                Digite o código de 6 dígitos enviado para seu email
              </p>
            </div>

            <div className="info-box">
              <div className="email-info">
                <FiMail className="email-icon" />
                <span className="email-text">GABIRUCORP@GMAIL.COM</span>
              </div>
              <p className="info-text">
                Enviamos um código de 6 dígitos para este email. Insira o código para redefinir sua senha!
              </p>
            </div>

            <div className="form-container">
              <div className="input-group">
                <label className="input-label">
                  Código de 6 dígitos
                </label>
                <div className="code-input-container">
                  <input
                    type="text"
                    placeholder="123456"
                    value={Codigo}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    maxLength={6}
                    className="code-input"
                  />
                  <div className="code-hint">
                    Digite apenas números
                  </div>
                </div>
                
                <div className="code-display">
                  {[...Array(6)].map((_, index) => (
                    <div 
                      key={index} 
                      className="code-digit"
                      style={{
                        borderColor: Codigo.length > index ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {Codigo[index] || ''}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!Codigo || Codigo.length !== 6}
                className="confirm-button"
              >
                <FiCheck className="button-icon" />
                <span className="button-text">Verificar Código</span>
              </button>

              <div className="links-container">
                <div className="resend-container">
                  <span className="resend-text">Não recebeu o código? </span>
                  <button className="resend-button">
                    Reenviar código
                  </button>
                </div>
                <Link to="/" className="back-link">
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

export default RedfineCod;