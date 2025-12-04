import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Register.css';
import api from "../services/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const backgroundImage = require('../assets/images/backgroundweb.jpg');

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para validar os campos
  const validarCampos = () => {
    // Limpa erros anteriores
    setError('');

    // Verifica campos vazios
    if (!email || !senha || !confirmarSenha) {
      setError("Preencha todos os campos!");
      return false;
    }

    // Valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Digite um email válido! Ex: exemplo@gmail.com");
      return false;
    }

    // Valida senha
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

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return false;
    }

    return true;
  };

  // Função para registrar o usuário
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
        nome: email.split('@')[0], // Usa parte do email como nome temporário
        email: email,
        senha: senha,
      });

      console.log('✅ Usuário registrado:', response.data);

      // SALVA O USUÁRIO NO LOCALSTORAGE TEMPORARIAMENTE
      localStorage.setItem('temp_user_data', JSON.stringify(response.data));

      alert("✅ Usuário registrado com sucesso!");
          navigate("/registerid", { 
      state: { 
        userData: response.data 
      } 
    }); // Redireciona para próxima etapa e salva o usuário

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

  // Submit com Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleRegister(e);
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
            <h2 className="textocontainer">Registro</h2>

            {/* Mensagem de erro */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              {/* EMAIL */}
              <div className="form-group">
                <label className="campos">Email:</label>
                <input
                  className="field"
                  type="email"
                  placeholder="SeuEmail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </div>

              {/* SENHA */}
              <div className="form-group">
                <label className="campos">Senha:</label>
                <div className="password-input-container">
                  <input
                    className="field password-field"
                    type={showSenha ? "text" : "password"}
                    placeholder="Senha Super Segura"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha(!showSenha)}
                    className="password-toggle"
                    disabled={loading}
                    aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showSenha ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CONFIRMAR SENHA */}
              <div className="form-group">
                <label className="campos">Confirmar Senha:</label>
                <div className="password-input-container">
                  <input
                    className="field password-field"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="password-toggle"
                    disabled={loading}
                    aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* BOTÃO REGISTRAR */}
              <button 
                className="button" 
                type="submit"
                disabled={loading}
              >
                <span className="button-text">
                  {loading ? 'Registrando...' : 'Registrar'}
                </span>
              </button>
            </form>

            {/* LINK PARA LOGIN */}
            <div className="login-link-container">
              <p className="login-text">
                Já tem uma conta? 
                <Link to="/" className="login-link">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;