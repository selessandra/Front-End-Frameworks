import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiChevronRight, FiHash, FiAlertTriangle, FiUserX } from 'react-icons/fi';
import api from "../services/api";
import '../assets/Registerid.css';

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const Registerid = () => {
  const [clashId, setClashId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = location.state?.userData;
    
    if (userData?.id_usuario) {
      console.log('✅ ID do usuário recebido:', userData.id_usuario);
      setUserId(userData.id_usuario);
      localStorage.setItem('temp_user_id', userData.id_usuario);
      setUserNotFound(false);
    } else {
      const storedUserId = localStorage.getItem('temp_user_id');
      const storedUserData = localStorage.getItem('temp_user_data');
      
      if (storedUserId && storedUserData) {
        setUserId(storedUserId);
        setUserNotFound(false);
      } else {
        setUserNotFound(true);
      }
    }
  }, [location]);

  const handleChangeClashId = (text) => {
    const formatted = text.replace(/[^a-zA-Z0-9]/g, "");
    setClashId(formatted.toUpperCase());
    setError('');
  };

  const handleRegisterId = async (e) => {
    e?.preventDefault();
    
    if (!userId) {
      setError("Erro: usuário não encontrado. Faça o registro novamente.");
      return;
    }
    
    setLoading(true);
    setError('');

    if (!clashId.trim()) {
      setError("Digite seu ID do Clash Royale!");
      setLoading(false);
      return;
    }

    if (clashId.length < 8) {
      setError("ID inválido — o Clash ID deve ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Cadastrando Clash ID:', { userId, clashId });

      const response = await api.post("/jogador/cadastrar", {
        idUsuario: userId,
        clashId: clashId
      });

      console.log('✅ Jogador cadastrado:', response.data);

      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.nome = response.data.nome;
        localStorage.setItem('usuario', JSON.stringify(user));
      }

      localStorage.removeItem('temp_user_id');
      localStorage.removeItem('temp_user_data');

      alert("✅ Jogador cadastrado com sucesso!");
      navigate('/');

    } catch (err) {
      console.error('❌ Erro ao cadastrar jogador:', err);
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 400) {
        setError("Clash ID inválido ou já cadastrado.");
      } else if (err.response?.status === 404) {
        setError("Usuário não encontrado.");
      } else if (err.code === 'ERR_NETWORK') {
        setError("Não foi possível conectar ao servidor.");
      } else {
        setError("Erro ao cadastrar jogador. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && userId) {
      handleRegisterId(e);
    }
  };

  const handleBackToRegister = () => {
    localStorage.removeItem('temp_user_id');
    localStorage.removeItem('temp_user_data');
    navigate('/Register');
  };

  const handleBackToLogin = () => {
    localStorage.removeItem('temp_user_id');
    localStorage.removeItem('temp_user_data');
    navigate('/');
  };

  if (userNotFound) {
    return (
      <div className="registerid-container">
        <div 
          className="registerid-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="registerid-overlay" />
          
          <button 
            onClick={handleBackToLogin}
            className="registerid-back-button"
          >
            <FiArrowLeft className="registerid-back-icon" />
          </button>

          <main className="registerid-main-content">
            <div className="registerid-header">
              <h1 className="registerid-logo">
                <span className="registerid-logo-gradient">CLASH</span>
                <span className="registerid-logo-highlight">HUB</span>
              </h1>
              <p className="registerid-subtitle">Erro no cadastro</p>
            </div>

            <div className="registerid-card">
              <div className="registerid-card-header">
                <FiUserX className="registerid-card-icon" />
                <h2 className="registerid-card-title">Usuário não encontrado</h2>
                <p className="registerid-card-subtitle">
                  Não foi possível encontrar os dados do seu registro
                </p>
              </div>

              <div className="registerid-user-not-found">
                <FiAlertTriangle className="registerid-not-found-icon" />
                <h3 className="registerid-not-found-title">Dados perdidos</h3>
                <p className="registerid-not-found-text">
                  Os dados do seu registro foram perdidos ou expiraram. 
                  Por favor, faça o registro novamente.
                </p>

                <div className="registerid-not-found-suggestions">
                  <h4>Possíveis causas:</h4>
                  <ul>
                    <li>Você demorou muito para completar o cadastro</li>
                    <li>Navegou para outra página durante o registro</li>
                    <li>Os cookies/localStorage foram limpos</li>
                    <li>Ocorreu um erro no processo de registro</li>
                  </ul>
                </div>

                <div className="registerid-error-actions">
                  <button 
                    onClick={handleBackToRegister}
                    className="registerid-error-button"
                  >
                    Fazer Registro Novamente
                  </button>
                  
                  <Link to="/" className="registerid-back-link" onClick={handleBackToLogin}>
                    Voltar para o Login
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="registerid-container">
      <div 
        className="registerid-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="registerid-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="registerid-back-button"
        >
          <FiArrowLeft className="registerid-back-icon" />
        </button>

        <main className="registerid-main-content">
          <div className="registerid-header">
            <h1 className="registerid-logo">
              <span className="registerid-logo-gradient">CLASH</span>
              <span className="registerid-logo-highlight">HUB</span>
            </h1>
            <p className="registerid-subtitle">Completar cadastro</p>
          </div>

          <div className="registerid-card">
            <div className="registerid-card-header">
              <FiUser className="registerid-card-icon" />
              <h2 className="registerid-card-title">Clash ID</h2>
              <p className="registerid-card-subtitle">
                Última etapa para completar seu cadastro
              </p>
            </div>

            <div className="registerid-progress-container">
              <div className="registerid-progress-bar">
                <div className="registerid-progress-fill" />
              </div>
              <div className="registerid-progress-steps">
                <span className="registerid-progress-step">1. Registro</span>
                <span className="registerid-progress-step registerid-active-step">
                  2. Clash ID
                </span>
              </div>
            </div>

            <div className="registerid-user-info">
              <div className="registerid-user-info-item">
                <span className="registerid-user-info-label">ID do usuário:</span>
                <span className="registerid-user-info-value">
                  {userId ? `#${userId}` : 'Carregando...'}
                </span>
              </div>
              <p className="registerid-user-info-text">
                Digite seu Clash ID do Clash Royale abaixo
              </p>
            </div>

            {error && (
              <div className="registerid-error-container">
                <FiAlertTriangle className="registerid-error-icon" />
                <span className="registerid-error-text">{error}</span>
              </div>
            )}

            <div className="registerid-form-container">
              <div className="registerid-input-group">
                <label className="registerid-input-label">
                  <FiHash className="registerid-label-icon" />
                  Clash ID
                </label>
                <input
                  type="text"
                  placeholder="Ex: JGCUU99V2"
                  value={clashId}
                  onChange={(e) => handleChangeClashId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading || !userId}
                  maxLength={15}
                  className="registerid-input"
                />
                <div className="registerid-input-hint">
                  Apenas letras e números (máx. 15 caracteres)
                </div>
              </div>

              <button 
                onClick={handleRegisterId}
                disabled={loading || !userId || clashId.length < 8}
                className="registerid-confirm-button"
              >
                {loading ? (
                  <span className="registerid-loading-text">Validando...</span>
                ) : (
                  <>
                    <FiChevronRight className="registerid-button-icon" />
                    <span className="registerid-button-text">Finalizar Cadastro</span>
                  </>
                )}
              </button>

              <div className="registerid-back-container">
                <p className="registerid-back-text">
                  Problemas com o cadastro?
                </p>
                <Link to="/register" className="registerid-back-link" onClick={handleBackToRegister}>
                  Voltar ao registro
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registerid;