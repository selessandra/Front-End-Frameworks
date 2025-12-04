import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUserPlus, FiArrowLeft, FiCheck } from 'react-icons/fi';
import api from "../services/api";
import '../assets/Register.css';
const backgroundImage = require('../assets/images/backgroundweb.jpg');



const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Za-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (password.length >= 8) strength += 25;
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (password) => {
    setSenha(password);
    checkPasswordStrength(password);
  };

  const validarCampos = () => {
    setError('');

    if (!email || !senha || !confirmarSenha) {
      setError("Preencha todos os campos!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Digite um email válido! Ex: exemplo@gmail.com");
      return false;
    }

    if (senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres!");
      return false;
    }

    if (!/[A-Za-z]/.test(senha)) {
      setError("A senha deve conter pelo menos uma letra.");
      return false;
    }

    if (!/[0-9]/.test(senha)) {
      setError("A senha deve conter pelo menos um número.");
      return false;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    
    if (!validarCampos()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📤 Registrando usuário:', { email });
      
      const response = await api.post("/usuarios", {
        nome: email.split('@')[0],
        email: email,
        senha: senha,
      });

      console.log('✅ Usuário registrado:', response.data);

      localStorage.setItem('temp_user_data', JSON.stringify(response.data));

      alert("✅ Usuário registrado com sucesso!");
      navigate("/registerid", { 
        state: { 
          userData: response.data 
        } 
      });

    } catch (err) {
      console.error('❌ Erro no registro:', err);
      
      if (err.response?.status === 400 && err.response.data?.error?.includes("Email já está cadastrado")) {
        setError("Este email já está em uso! Tente outro.");
      } else if (err.response?.status === 400) {
        setError("Dados inválidos. Verifique as informações.");
      } else if (err.response?.status === 500) {
        setError("Erro interno do servidor. Tente novamente mais tarde.");
      } else if (err.code === 'ERR_NETWORK') {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else {
        setError("Erro ao registrar usuário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleRegister(e);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return '#ff4757';
    if (passwordStrength < 75) return '#ffa502';
    return '#2ed573';
  };

  return (
    <div className="register-container">
      <div 
        className="register-background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="register-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="register-back-button"
        >
          <FiArrowLeft className="register-back-icon" />
        </button>

        <main className="register-main-content">
          <div className="register-header">
            <h1 className="register-logo">
              <span className="register-logo-gradient">CLASH</span>
              <span className="register-logo-highlight">HUB</span>
            </h1>
            <p className="register-subtitle">Crie sua conta</p>
          </div>

          <div className="register-card">
            <div className="register-card-header">
              <FiUserPlus className="register-card-icon" />
              <h2 className="register-card-title">Registrar</h2>
              <p className="register-card-subtitle">
                Preencha seus dados para criar uma conta
              </p>
            </div>

            {error && (
              <div className="register-error-container">
                <span className="register-error-text">{error}</span>
              </div>
            )}

            <div className="register-form-container">
              <div className="register-input-group">
                <label className="register-input-label">
                  <FiMail className="register-label-icon" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="register-input"
                />
              </div>

              <div className="register-input-group">
                <div className="register-password-header">
                  <label className="register-input-label">
                    <FiLock className="register-label-icon" />
                    Senha
                  </label>
                  <span className="register-strength-indicator">
                    Força: <span style={{ color: getStrengthColor() }}>
                      {passwordStrength < 50 ? 'Fraca' : passwordStrength < 75 ? 'Boa' : 'Forte'}
                    </span>
                  </span>
                </div>
                <div className="register-password-input-wrapper">
                  <input
                    type={showSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="register-input"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSenha(!showSenha)}
                    className="register-toggle-button"
                    disabled={loading}
                  >
                    {showSenha ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                
                <div className="register-strength-bar-container">
                  <div 
                    className="register-strength-bar"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  />
                </div>

                <div className="register-requirements">
                  <div className="register-requirement-item">
                    <div 
                      className="register-requirement-check"
                      style={{
                        backgroundColor: senha.length >= 6 ? '#2ed573' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {senha.length >= 6 && <FiCheck className="register-check-icon" />}
                    </div>
                    <span style={{
                      color: senha.length >= 6 ? '#2ed573' : 'rgba(255,255,255,0.6)'
                    }}>
                      Mínimo 6 caracteres
                    </span>
                  </div>
                  
                  <div className="register-requirement-item">
                    <div 
                      className="register-requirement-check"
                      style={{
                        backgroundColor: /[A-Za-z]/.test(senha) ? '#2ed573' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {/[A-Za-z]/.test(senha) && <FiCheck className="register-check-icon" />}
                    </div>
                    <span style={{
                      color: /[A-Za-z]/.test(senha) ? '#2ed573' : 'rgba(255,255,255,0.6)'
                    }}>
                      Pelo menos uma letra
                    </span>
                  </div>
                  
                  <div className="register-requirement-item">
                    <div 
                      className="register-requirement-check"
                      style={{
                        backgroundColor: /[0-9]/.test(senha) ? '#2ed573' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {/[0-9]/.test(senha) && <FiCheck className="register-check-icon" />}
                    </div>
                    <span style={{
                      color: /[0-9]/.test(senha) ? '#2ed573' : 'rgba(255,255,255,0.6)'
                    }}>
                      Pelo menos um número
                    </span>
                  </div>
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-input-label">
                  <FiLock className="register-label-icon" />
                  Confirmar Senha
                </label>
                <div className="register-password-input-wrapper">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="register-input"
                    style={{
                      borderColor: confirmarSenha && senha !== confirmarSenha ? '#ff4757' : 'rgba(255,255,255,0.2)'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="register-toggle-button"
                    disabled={loading}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {confirmarSenha && senha !== confirmarSenha && (
                  <span className="register-error-text">As senhas não coincidem!</span>
                )}
                {confirmarSenha && senha === confirmarSenha && senha.length >= 6 && (
                  <span className="register-success-text">✓ Senhas correspondem</span>
                )}
              </div>

              <button 
                onClick={handleRegister}
                disabled={loading || !email || !senha || !confirmarSenha || senha !== confirmarSenha || senha.length < 6}
                className="register-button"
                style={{
                  opacity: (loading || !email || !senha || !confirmarSenha || senha !== confirmarSenha || senha.length < 6) ? 0.5 : 1
                }}
              >
                {loading ? (
                  <span className="register-loading-text">Registrando...</span>
                ) : (
                  <>
                    <FiUserPlus className="register-button-icon" />
                    <span className="register-button-text">Criar Conta</span>
                  </>
                )}
              </button>

              <div className="register-login-container">
                <span className="register-login-text">Já tem uma conta? </span>
                <Link to="/" className="register-login-link">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;