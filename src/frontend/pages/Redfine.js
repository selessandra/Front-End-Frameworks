import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft, FiSend, FiLock, FiLoader } from 'react-icons/fi';
import '../assets/Redfine.css';

const background = require('../assets/images/backgroundweb.jpg');

function Redfine() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // Validações
    if (!email.trim()) {
      alert("Digite seu email!");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/reset/request-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenar email no localStorage para usar na próxima tela
        localStorage.setItem("resetEmail", email);
        
        // Mostrar mensagem de sucesso
        setMessage("Código enviado com sucesso! Verifique seu email.");
        
        // Navegar para a tela de código após 2 segundos
        setTimeout(() => {
          navigate("/RedfineCod");
        }, 2000);
      } else {
        setMessage(data.error || "Erro ao enviar código");
        alert(data.error || "Erro ao enviar código. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro de conexão com o servidor");
      alert("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
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
          disabled={loading}
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
                  disabled={loading}
                />
                <div className="redefine-input-hint">
                  O código será enviado para este email
                </div>
              </div>

              {/* Mensagem de status */}
              {message && (
                <div className={`redefine-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button 
                onClick={handleSubmit}
                disabled={!email || loading}
                className={`redefine-send-button ${email && !loading ? 'send-button-hover' : ''}`}
                style={{ opacity: (!email || loading) ? 0.5 : 1 }}
              >
                {loading ? (
                  <>
                    <FiLoader className="redefine-button-icon spinning" />
                    <span className="redefine-button-text">Enviando...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="redefine-button-icon" />
                    <span className="redefine-button-text">Enviar Código</span>
                  </>
                )}
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