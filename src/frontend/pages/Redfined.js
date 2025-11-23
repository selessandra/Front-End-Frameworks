import React, { useState } from "react";
import "../assets/Redfined.css";
import background from "../assets/images/backgroundweb.jpg";
import { Link, useNavigate } from "react-router-dom";

function Redfined() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay"></div>

      <div className="contentRd">
        <h1 className="tittle">Veasy</h1>

        <div className="inputcontainerRd">
          <h2>Senha Redefinada!</h2>

          <div className="textRd">
            <p>Sua senha foi redefinida com sucesso!</p>

            <button onClick={() => navigate("/")}className="circleButton">✓</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Redfined;
