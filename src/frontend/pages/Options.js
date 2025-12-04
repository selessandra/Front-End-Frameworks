import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Weboptions.css'; // We'll create this CSS file

const Options = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);

  // Mock AsyncStorage for web (using localStorage)
  const loadPhoto = async (id) => {
    try {
      const saved = localStorage.getItem(`player_photo_${id}`);
      if (saved) setPhoto(saved);
    } catch (err) {
      console.log("Erro ao carregar foto:", err);
    }
  };

  const fetchPlayerData = async () => {
    try {
      // For web, you might need to adjust your API calls
      // This is a mock implementation
      const token = localStorage.getItem('token');
      const response = await fetch("/api/jogador/me", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      setName(data.nome);
      setUserId(data.id_usuario);

      loadPhoto(data.id_usuario);

    } catch (err) {
      console.log("Erro fetchPlayerData:", err);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  useEffect(() => {
    if (userId) loadPhoto(userId);
  }, [userId]);

  return (
    <div className="options-container">
      <div className="bg"></div>
      <div className="overlay"></div>

      <div className="content-options">
        <h1 className="title">Player Settings</h1>

        <div className="options-box">
          <div className="user-photo-section">
            {photo ? (
              <img src={photo} alt="User" className="user-photo" />
            ) : (
              <div className="user-placeholder">
                <i className="material-icons">person</i>
              </div>
            )}
          </div>

          <h2 className="user-name">{name}</h2>

          <Link to="/Redefinir-Senha" className="setting-link">
            <div className="setting-item">
              <span>Trocar Senha</span>
            </div>
          </Link>

          <Link to="/deleteAccount" className="setting-link">
            <div className="setting-item">
              <span>Deletar Conta</span>
            </div>
          </Link>

          <Link to="/" className="setting-link">
            <div className="setting-item">
              <span>Sair</span>
            </div>
          </Link>
        </div>

        <div className="bottom-nav">
          <Link to="/HomeDecker" className="nav-item">
            <i className="material-icons">dashboard</i>
          </Link>

          <Link to="/HomePlayer" className="nav-item">
            <i className="material-icons">person</i>
          </Link>

          <Link to="/Options" className="nav-item active">
            <i className="material-icons">settings</i>
            <span className="nav-label">Options</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Options;