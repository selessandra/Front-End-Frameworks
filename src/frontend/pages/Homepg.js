import React, { useState } from 'react';
import '../assets/Register.css';
import background from '../assets/images/backgroundweb.jpg';
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

function Homepg() {
 

  return (
    <div className="bg">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="tittle">Veasy</h1>

      </div>
    </div>
  );
}

export default Homepg;