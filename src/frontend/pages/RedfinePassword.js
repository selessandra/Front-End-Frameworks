import React, { useState } from "react";
import "../assets/RedfinePassword.css";
import background from "../assets/images/backgroundweb.jpg";
import { Link, useNavigate } from "react-router-dom";

function RedfinePassword() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");

  return (
    <div className="bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay"></div>

      <div className="contentPass">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainerPass">
          <h2>Redefinir Senha</h2>

          <div className="fieldPass">
            <p>Senha:</p>
            <input
              type="password"
              placeholder="Senha Super Segura"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
              <p>Confirmar Senha:</p>
            <input
              type="password"
              placeholder="confirme sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button className="buttonPass" onClick={() => navigate("/Redfined")}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RedfinePassword;
