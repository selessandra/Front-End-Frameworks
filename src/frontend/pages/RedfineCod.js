import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiLock, FiLoader } from 'react-icons/fi';
import '../assets/RedfineCod.css';

const background = require('../assets/images/backgroundweb.jpg');

function RedfineCod() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      navigate("/redefine");
    }

    // Timer para expiração do código
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus para o próximo input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split('');
      setCode(newCode);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setMessage("Digite o código completo de 6 dígitos");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      navigate("/redefine");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/reset/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Código verificado com sucesso!");
        // Armazenar código verificado
        localStorage.setItem("verifiedCode", fullCode);
        
        // Redirecionar para tela de nova senha
        setTimeout(() => {
          navigate("/new-password");
        }, 1000);
      } else {
        setMessage(data.error || "Código inválido");
        // Limpar inputs em caso de erro
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) return;

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
        setMessage("Novo código enviado!");
        setTimeLeft(900);
        setCanResend(false);
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();
      } else {
        setMessage(data.error || "Erro ao reenviar código");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="redefinecod-container">
      <div 
        className="redefinecod-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="redefinecod-overlay" />
        
        <button 
          onClick={() => navigate(-1)}
          className="redefinecod-back-button back-button-hover"
          disabled={loading}
        >
          <FiArrowLeft className="redefinecod-back-icon" />
        </button>

        <main className="redefinecod-main-content">
          <div className="redefinecod-header">
            <h1 className="redefinecod-logo">
              <span className="redefinecod-logo-gradient">CLASH</span>
              <span className="redefinecod-logo-highlight">HUB</span>
            </h1>
            <p className="redefinecod-subtitle">Verificação de código</p>
          </div>

          <div className="redefinecod-card">
            <div className="redefinecod-card-header">
              <FiLock className="redefinecod-card-icon" />
              <h2 className="redefinecod-card-title">Verifique seu email</h2>
              <p className="redefinecod-card-subtitle">
                Digite o código de 6 dígitos que enviamos para seu email
              </p>
            </div>

            <div className="redefinecod-info-box">
              <p className="redefinecod-info-text">
                O código expira em: <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>

            <div className="redefinecod-form-container">
              <div className="redefinecod-inputs-container">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading}
                    className="redefinecod-digit-input"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {message && (
                <div className={`redefinecod-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button 
                onClick={handleVerify}
                disabled={code.join('').length !== 6 || loading}
                className="redefinecod-verify-button"
              >
                {loading ? (
                  <>
                    <FiLoader className="redefinecod-button-icon spinning" />
                    <span className="redefinecod-button-text">Verificando...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="redefinecod-button-icon" />
                    <span className="redefinecod-button-text">Verificar Código</span>
                  </>
                )}
              </button>

              <div className="redefinecod-resend-container">
                <p className="redefinecod-resend-text">
                  Não recebeu o código?
                </p>
                <button
                  onClick={handleResend}
                  disabled={!canResend || loading}
                  className="redefinecod-resend-button"
                >
                  Reenviar código
                </button>
              </div>

              <div className="redefinecod-login-container">
                <span className="redefinecod-login-text">Voltar para </span>
                <Link to="/" className="redefinecod-login-link">
                  login
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RedfineCod;