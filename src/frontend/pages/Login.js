import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Login.css';
import api from "../services/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const Login = () => {  
  const [emailfield, setEmailField] = useState('');
  const [senhafield, setSenhaField] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Testa conexão com o backend
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

    // Evento beforeunload
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
      console.error('Detalhes:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });
      
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

  // Para permitir submit com Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <div 
        className="image-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="viewcontainer">
          
          <div className="header">
            <h1 className="text-logo">Veasy</h1>
          </div>

          <div className="forms">
            <h2 className="textocontainer">Entrar</h2>

            {error && (
              <div className="error-message" style={{
                background: 'rgba(255, 100, 100, 0.2)',
                border: '2px solid #ff5555',
                color: '#ffdddd',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {error}
              </div>
            )}

            <label className="campos"> Email: </label>
            <input
              className="field"
              type="email"
              placeholder="SeuEmail@email.com"
              value={emailfield}
              onChange={(e) => setEmailField(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />

            <label className="campos"> Senha: </label>
            <div className="password-input-container">
              <input
                className="field password-field"
                type={showSenha ? "text" : "password"}
                placeholder="Senha Super Segura"
                value={senhafield}
                onChange={(e) => setSenhaField(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowSenha(!showSenha)}
                className="password-toggle"
                disabled={loading}
              >
                {showSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button 
              className="button" 
              onClick={handleLogin}
              disabled={loading}
              style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
            >
              <span className="button-text">
                {loading ? 'Carregando...' : 'Entrar'}
              </span>
            </button>

            <Link to="/Redfine" className="forgot-password-link">
              Esqueceu a Senha?
            </Link>

            <p className="register-text">
              Não tem conta? <Link to="/Register" className="register-link">Registre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Login;