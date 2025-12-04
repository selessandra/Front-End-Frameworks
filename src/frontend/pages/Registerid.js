import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiChevronRight, FiHash } from 'react-icons/fi';
import api from "../services/api";
import '../assets/Registerid.css';

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const RegisterId = () => {
  const [clashId, setClashId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = location.state?.userData;
    
    if (userData?.id_usuario) {
      console.log('✅ ID do usuário recebido:', userData.id_usuario);
      setUserId(userData.id_usuario);
      localStorage.setItem('temp_user_id', userData.id_usuario);
    } else {
      const storedUserId = localStorage.getItem('temp_user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        setError('Usuário não encontrado. Por favor, faça o registro novamente.');
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

    if (!userId) {
      setError("Erro: usuário não encontrado. Faça o registro novamente.");
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
    if (e.key === 'Enter' && !loading) {
      handleRegisterId(e);
    }
  };

  return (
    <div className="register-id-container">
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
            <p className="subtitle">Completar cadastro</p>
          </div>

          <div className="card">
            <div className="card-header">
              <FiUser className="card-icon" />
              <h2 className="card-title">Clash ID</h2>
              <p className="card-subtitle">
                Última etapa para completar seu cadastro
              </p>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
              <div className="progress-steps">
                <span className="progress-step">1. Registro</span>
                <span className="progress-step active-step">
                  2. Clash ID
                </span>
              </div>
            </div>

            <div className="user-info">
              <div className="user-info-item">
                <span className="user-info-label">ID do usuário:</span>
                <span className="user-info-value">
                  {userId || 'Carregando...'}
                </span>
              </div>
              <p className="user-info-text">
                Digite seu Clash ID do Clash Royale abaixo
              </p>
            </div>

            {error && (
              <div className="error-container">
                <span className="error-text">{error}</span>
              </div>
            )}

            <div className="form-container">
              <div className="input-group">
                <label className="input-label">
                  <FiHash className="label-icon" />
                  Clash ID
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Ex: JGCUU99V2"
                    value={clashId}
                    onChange={(e) => handleChangeClashId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading || !userId}
                    maxLength={15}
                    className="input"
                  />
                  <div className="input-hint">
                    Apenas letras e números (máx. 15 caracteres)
                  </div>
                </div>
              </div>

              <button 
                onClick={handleRegisterId}
                disabled={loading || !userId || clashId.length < 8}
                className="confirm-button"
                style={{ 
                  opacity: (loading || !userId || clashId.length < 8) ? 0.5 : 1 
                }}
              >
                {loading ? (
                  <span className="loading-text">Validando...</span>
                ) : (
                  <>
                    <FiChevronRight className="button-icon" />
                    <span className="button-text">Finalizar Cadastro</span>
                  </>
                )}
              </button>

              <div className="back-container">
                <p className="back-text">
                  Problemas com o cadastro?
                </p>
                <Link to="/register" className="back-link">
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

export default RegisterId;