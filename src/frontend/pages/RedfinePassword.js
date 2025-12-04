import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import '../assets/RedfinePassword.css';

const background = require('../assets/images/backgroundweb.jpg');

function RedfinePassword() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    
    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    
    navigate("/Redfined");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="back-button-top"
        >
          <FiArrowLeft className="back-icon" />
        </button>

        <main className="main-content">
          <div className="header">
            <h1 className="logo">
              <span className="logo-gradient">CLASH</span>
              <span className="logo-highlight">HUB</span>
            </h1>
            <p className="subtitle">Nova senha</p>
          </div>

          <div className="card">
            <div className="card-header">
              <FiLock className="card-icon" />
              <h2 className="card-title">Redefinir Senha</h2>
              <p className="card-subtitle">
                Digite sua nova senha abaixo
              </p>
            </div>

            <div className="form-container">
              <div className="input-group">
                <label className="input-label">Nova Senha</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="input"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-button"
                    type="button"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {senha && senha.length < 6 && (
                  <span className="error-text">A senha deve ter pelo menos 6 caracteres</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Confirmar Senha</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`input ${confirmarSenha && senha !== confirmarSenha ? 'input-error' : ''}`}
                  />
                  <button 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="toggle-button"
                    type="button"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {confirmarSenha && senha !== confirmarSenha && (
                  <span className="error-text">As senhas não coincidem</span>
                )}
                {confirmarSenha && senha === confirmarSenha && senha.length >= 6 && (
                  <span className="success-text">✓ Senhas correspondem</span>
                )}
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!senha || !confirmarSenha || senha !== confirmarSenha || senha.length < 6}
                className={`confirm-button ${(!senha || !confirmarSenha || senha !== confirmarSenha || senha.length < 6) ? 'button-disabled' : ''}`}
              >
                <FiLock className="button-icon" />
                Confirmar
              </button>
            </div>
          </div>
        </main>

        <div className="bottom-info">
          <span className="bottom-text">
            Use uma senha segura com letras, números e símbolos
          </span>
        </div>
      </div>
    </div>
  );
}

export default RedfinePassword;