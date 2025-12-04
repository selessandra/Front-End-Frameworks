import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../assets/Registerid.css';
import api from "../services/api";

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const RegisterId = () => {
  const [clashId, setClashId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtém o ID do usuário que foi registrado
  useEffect(() => {
    // Verifica se veio da tela de registro com dados
    const userData = location.state?.userData;
    
    if (userData?.id_usuario) {
      console.log('✅ ID do usuário recebido:', userData.id_usuario);
      setUserId(userData.id_usuario);
      // Armazena no localStorage para persistência
      localStorage.setItem('temp_user_id', userData.id_usuario);
    } else {
      // Tenta recuperar do localStorage se a página for recarregada
      const storedUserId = localStorage.getItem('temp_user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        setError('Usuário não encontrado. Por favor, faça o registro novamente.');
      }
    }
  }, [location]);

  // 🔒 Bloqueia caracteres inválidos e força maiúsculo
  const handleChangeClashId = (text) => {
    const formatted = text.replace(/[^a-zA-Z0-9]/g, "");
    setClashId(formatted.toUpperCase());
    setError(''); // Limpa erro quando o usuário digita
  };

  const handleRegisterId = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    // Validações
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

      // Atualiza o usuário no localStorage se necessário
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.nome = response.data.nome;
        localStorage.setItem('usuario', JSON.stringify(user));
      }

      // Limpa o ID temporário
      localStorage.removeItem('temp_user_id');

      alert("✅ Jogador cadastrado com sucesso!");
      navigate('/'); // Redireciona para a tela de login

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

  // Submit com Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleRegisterId(e);
    }
  };

  return (
    <div className="container">
      <div 
        className="image-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="viewcontainer">
          
          {/* HEADER */}
          <div className="header">
            <h1 className="text-logo">Veasy</h1>
          </div>

          {/* FORMULÁRIO */}
          <div className="forms">
            <h2 className="textocontainer">Completar Cadastro</h2>

            {/* Informação do usuário */}
            <div className="user-info">
              <p className="user-info-text">
                Etapa 2 de 2: Cadastrar Clash ID
              </p>
              <p className="user-info-subtext">
                ID do usuário: <strong>{userId || 'Carregando...'}</strong>
              </p>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterId}>
              {/* CLASH ID */}
              <div className="form-group">
                <label className="campos">Clash ID:</label>
                <input
                  className="fieldID"
                  type="text"
                  placeholder="JGCUU99V2"
                  value={clashId}
                  onChange={(e) => handleChangeClashId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading || !userId}
                  maxLength={15}
                  pattern="[A-Z0-9]+"
                  title="Apenas letras maiúsculas e números"
                  required
                />
              </div>

              {/* BOTÃO CONFIRMAR */}
              <button 
                className="button" 
                type="submit"
                disabled={loading || !userId}
              >
                <span className="button-text">
                  {loading ? 'Validando...' : 'Confirmar'}
                </span>
              </button>
            </form>

            {/* VOLTAR */}
            <div className="back-link-container">
              <p className="back-text">
                Problemas com o cadastro? 
                <Link to="/register" className="back-link">
                  Voltar ao registro
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterId;