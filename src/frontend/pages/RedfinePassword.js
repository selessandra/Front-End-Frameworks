import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import '../assets/RedfinePassword.css';

const background = require('../assets/images/backgroundweb.jpg');

function RedfinePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validações
    if (!formData.newPassword || !formData.confirmPassword) {
      setMessage("Preencha todos os campos");
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("As senhas não coincidem");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("verifiedCode");

    if (!email || !code) {
      setMessage("Sessão expirada. Solicite um novo código.");
      setTimeout(() => {
        navigate("/Redfine");
      }, 2000);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/reset/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword: formData.newPassword,
          code
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Senha redefinida com sucesso!");
        
        // Limpar dados temporários
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("verifiedCode");
        
        // Redirecionar para tela de confirmação
        setTimeout(() => {
          navigate("/Redfined");
        }, 1500);
      } else {
        setMessage(data.error || "Erro ao redefinir senha");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro de conexão com o servidor");
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
    <div className="redefinepassword-container">
      <div 
        className="redefinepassword-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="redefinepassword-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="redefinepassword-back-button back-button-hover"
          disabled={loading}
        >
          <FiArrowLeft className="redefinepassword-back-icon" />
        </button>

        <main className="redefinepassword-main-content">
          <div className="redefinepassword-header">
            <h1 className="redefinepassword-logo">
              <span className="redefinepassword-logo-gradient">CLASH</span>
              <span className="redefinepassword-logo-highlight">HUB</span>
            </h1>
            <p className="redefinepassword-subtitle">Nova senha</p>
          </div>

          <div className="redefinepassword-card">
            <div className="redefinepassword-card-header">
              <FiLock className="redefinepassword-card-icon" />
              <h2 className="redefinepassword-card-title">Crie sua nova senha</h2>
              <p className="redefinepassword-card-subtitle">
                Digite e confirme sua nova senha abaixo
              </p>
            </div>

            <div className="redefinepassword-form-container">
              <div className="redefinepassword-input-group">
                <label className="redefinepassword-input-label">
                  <FiLock className="redefinepassword-label-icon" />
                  Nova Senha
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="redefinepassword-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="redefinepassword-input-hint">
                  Use letras, números e símbolos para maior segurança
                </div>
              </div>

              <div className="redefinepassword-input-group">
                <label className="redefinepassword-input-label">
                  <FiLock className="redefinepassword-label-icon" />
                  Confirmar Senha
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Digite novamente a senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="redefinepassword-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="redefinepassword-input-hint">
                  As senhas devem ser iguais
                </div>
              </div>

              {/* Mensagem de status */}
              {message && (
                <div className={`redefinepassword-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button 
                onClick={handleSubmit}
                disabled={!formData.newPassword || !formData.confirmPassword || loading}
                className="redefinepassword-submit-button"
              >
                <FiCheck className="redefinepassword-button-icon" />
                <span className="redefinepassword-button-text">
                  {loading ? "Redefinindo..." : "Redefinir Senha"}
                </span>
              </button>

              <div className="redefinepassword-login-container">
                <span className="redefinepassword-login-text">Lembrou sua senha? </span>
                <Link to="/" className="redefinepassword-login-link">
                  Fazer login
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RedfinePassword;