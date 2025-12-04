import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import api from "../services/api";
import '../assets/Login.css';

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const Login = () => {  
  const [emailfield, setEmailField] = useState('');
  const [senhafield, setSenhaField] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/usuarios/health');
        console.log('✅ Backend conectado:', response.data);
      } catch (error) {
        console.warn('⚠️ Backend não disponível:', error.message);
        setError('Backend offline. Certifique-se que o servidor está rodando na porta 3001.');
      }
    };

    testConnection();

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Deseja realmente sair?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailfield.trim()) {
      setError("O campo de email não pode ficar vazio.");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(emailfield)) {
      setError("Digite um email válido. Ex: exemplo@gmail.com");
      setLoading(false);
      return;
    }

    if (!senhafield.trim()) {
      setError("O campo de senha não pode ficar vazio.");
      setLoading(false);
      return;
    }
    if (senhafield.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }
    if (!/[A-Za-z]/.test(senhafield)) {
      setError("A senha deve conter pelo menos uma letra.");
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Enviando login para:', `${api.defaults.baseURL}/usuarios/login`);
      
      const response = await api.post("/usuarios/login", {
        email: emailfield,
        senha: senhafield
      });

      console.log('✅ Resposta recebida:', response.data);
      
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(user));

      alert("✅ Login realizado com sucesso!");
      navigate("/HomePlayer");

    } catch (err) {
      console.error('❌ Erro no login:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('⏱️ Timeout: O servidor demorou muito para responder.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('🌐 Erro de rede: Não foi possível conectar ao servidor. Verifique: 1) Backend está rodando? 2) Porta 3001 está acessível?');
      } else if (err.response) {
        if (err.response.status === 404) {
          setError("❌ Usuário não encontrado");
        } else if (err.response.status === 401) {
          setError("❌ Senha incorreta");
        } else if (err.response.status === 500) {
          setError("🔧 Erro interno do servidor. Verifique o console do backend.");
        } else {
          setError(`❌ Erro ${err.response.status}: ${err.response.data?.message || 'Erro desconhecido'}`);
        }
      } else if (err.request) {
        setError('🔌 Servidor não respondeu. O backend está rodando?');
      } else {
        setError('⚠️ Erro ao configurar a requisição');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div 
        className="login-background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="login-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="login-back-button back-button"
        >
          <FiArrowLeft className="login-back-icon" />
        </button>

        <main className="login-main-content">
          <div className="login-header">
            <h1 className="login-logo">
              <span className="login-logo-gradient">CLASH</span>
              <span className="login-logo-highlight">HUB</span>
            </h1>
            <p className="login-subtitle">Bem-vindo de volta!</p>
          </div>

          <div className="login-card">
            <div className="login-card-header">
              <FiUser className="login-card-icon" />
              <h2 className="login-card-title">Entrar</h2>
              <p className="login-card-subtitle">
                Acesse sua conta para continuar
              </p>
            </div>

            {error && (
              <div className="login-error-container error-message">
                <span className="login-error-text">{error}</span>
              </div>
            )}

            <div className="login-form-container">
              <div className="login-input-group">
                <label className="login-input-label">
                  <FiMail className="login-label-icon" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={emailfield}
                  onChange={(e) => setEmailField(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="login-input"
                />
              </div>

              <div className="login-input-group">
                <label className="login-input-label">
                  <FiLock className="login-label-icon" />
                  Senha
                </label>
                <div className="login-password-input-wrapper">
                  <input
                    type={showSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senhafield}
                    onChange={(e) => setSenhaField(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="login-input"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSenha(!showSenha)}
                    className="login-toggle-button toggle-button"
                    disabled={loading}
                  >
                    {showSenha ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleLogin}
                disabled={loading}
                className="login-button"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span className="login-loading-text">Carregando...</span>
                ) : (
                  <>
                    <FiUser className="login-button-icon" />
                    <span className="login-button-text">Entrar</span>
                  </>
                )}
              </button>

              <div className="login-links-container">
                <Link to="/Redfine" className="login-link">
                  Esqueceu a senha?
                </Link>
                <div className="login-register-container">
                  <span className="login-register-text">Não tem conta? </span>
                  <Link to="/Register" className="login-register-link">
                    Registre-se
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}; 

export default Login;