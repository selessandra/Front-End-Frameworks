import React, { useState } from 'react';
import '../assets/Register.css';
import background from '../assets/images/backgroundweb.jpg';
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom"; 


function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confisenha, setConfiSenha] = useState (''); 

  return (
    <div className="bg">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainer">
          <h2>Registrar</h2>

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


          <div className="field">
            <p>Senha:</p>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confisenha}
              onChange={(e) => setConfiSenha(e.target.value)}
            />
          </div>

          <button className='button'>Registre-se</button>

            <h6 className='registerrouter'>Já tem uma conta? <Link to="/">Entrar</Link></h6>
        </div>

      </div>
    </div>
  );
}

export default Register;