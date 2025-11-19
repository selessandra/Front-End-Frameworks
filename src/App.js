import React, { useState } from 'react';
import './App.css';
import background from './backgroundweb.jpg';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="bg">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainer">
          <h2>Entrar</h2>

          <div className="field">
            <h3>Email:</h3>
            <input
              type="text"
              placeholder="SeuEmail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <h4>Senha:</h4>
            <input
              type="password"
              placeholder="Senha Super Segura"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button className='button'>Entrar</button>

            <h6 className='registerrouter'>Não tem conta? <a href = 'register'>Registre-se</a></h6>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
