import React, { useState } from 'react';
import '../assets/Register.css';
import { Link, useNavigate } from 'react-router-dom';
{/*import background from '../assets/images/backgroundweb.jpg';*/}


function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confisenha, setConfiSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Aqui você faria a validação e chamada da API para registrar o usuário
    // Depois do registro bem-sucedido, redireciona para o RegisterId
    
    // Simulação de registro bem-sucedido
    // Substitua por sua lógica real de registro
    
    if (senha !== confisenha) {
      alert("As senhas não coincidem!");
      return;
    }
    
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    
    // Simula registro bem-sucedido
    alert("Registro realizado com sucesso! Agora informe seu Clash ID.");
    
    // Aqui você normalmente salvaria o usuário no contexto/global
    // window.usuario = { id_usuario: 123, email: email };
    
    // Redireciona para a tela de cadastro do Clash ID
    navigate('/Registerid');
  };

  return (
    <div className="bg">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainer">
          <h2>Registrar</h2>
          
          <form onSubmit={handleRegister}>
            <div className="field">
              <p>Email:</p>
              <input
                type="email"
                placeholder="SeuEmail@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <p>Senha:</p>
              <input
                type="password"
                placeholder="Senha Super Segura"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="field">
              <p>Confirmar Senha:</p>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confisenha}
                onChange={(e) => setConfiSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className='button'>
              Registre-se
            </button>
          </form>

          <h6 className='registerrouter'>
            Já tem uma conta? <Link to="/">Entrar</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Register;