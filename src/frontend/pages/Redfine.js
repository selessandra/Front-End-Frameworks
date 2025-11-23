import React, { useState } from "react";
import "../assets/Redfine.css";
import background from "../assets/images/backgroundweb.jpg";
import { Link, useNavigate } from "react-router-dom";

function Redfine() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay"></div>

      <div className="contentRed">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainerRed">
          <h2>Redefinir Senha</h2>

          <div className="textRed">
            <p >
              Digite o email usado na criação da conta para receber o código de
              segurança, use o código para redefinir sua senha!
            </p>
          </div>

          <div className="fieldRed">
            <p>Email:</p>
            <input
              type="text"
              placeholder="SeuEmail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="buttonRed" onClick={() => navigate("/RedfineCod")}>
            Enviar
          </button>

          <h3 className="registerrouterRed">
            Tem conta? <Link to="/">Entrar</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Redfine;
