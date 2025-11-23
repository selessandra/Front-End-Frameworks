import React, { useState } from "react";
import "../assets/RedfineCod.css";
import background from "../assets/images/backgroundweb.jpg";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RedfineCod() {
  const navigate = useNavigate();
  const [Codigo, setCodigo] = useState("");

  return (
    <div className="bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay"></div>

      <div className="contentCod">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainerCod">
          <h2>Redefinir Senha</h2>

          <div className="textCod">
            {" "}
            <p className="textCod">
              Enviaremos um código de 6 dígitos para o email:
              GABIRUCORP@GMAIL.COM insira o código para redefinir sua senha!
            </p>
          </div>
          <div className="fieldCod">
            <input
              type="password"
              placeholder="*****"
              value={Codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
          <button className="buttonCod" onClick={() => navigate("/RedfinePassword")}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RedfineCod;
