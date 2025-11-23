import React, { useState } from 'react';
import './frontend/assets/App.css';
import background from './frontend/assets/images/backgroundweb.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay"></div>

      <div className="content">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainerApp">
          <h2>Entrar</h2>

          <div className="field">
            <p>Email:</p>
            <input
              type="text"
              placeholder="SeuEmail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <p>Senha:</p>
            <input
              type="password"
              placeholder="Senha Super Segura"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

         
           <button className="button" onClick={() => navigate("/Homepg")}>
            Entrar
          </button>

          <h3 className="registerrouter">
            Não tem conta? <a href="Register">Registre-se</a>
          </h3>

          <h4 className="registerrouter"> 
            <a href='Redfine'>Esqueceu a senha?</a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
