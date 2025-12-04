import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiUser, FiSettings, FiLock, FiTrash2, FiLogOut, FiCamera } from 'react-icons/fi';
import '../assets/Options.css'; // Importando o CSS separado

const Options = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('Jogador Clash');
  const navigate = useNavigate();

  const pickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPhoto(event.target.result);
          localStorage.setItem('clashhub_player_photo', event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  useEffect(() => {
    const loadData = () => {
      const savedPhoto = localStorage.getItem('clashhub_player_photo');
      const savedPlayer = localStorage.getItem('clashhub_player');
      
      if (savedPhoto) {
        setPhoto(savedPhoto);
      }
      
      if (savedPlayer) {
        try {
          const playerData = JSON.parse(savedPlayer);
          setName(playerData.nome || 'Jogador Clash');
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      navigate('/');
    }
  };

  return (
    <div className="options-container">
      <div className="options-background">
        <div className="options-overlay" />
        
        <h1 className="options-title">Configurações</h1>

        <main className="options-main-content">
          <div className="options-profile-card">
            {/* Foto do perfil */}
            <div className="options-photo-section">
              <button 
                onClick={pickImage} 
                className="options-photo-button photo-button-hover"
                aria-label="Alterar foto"
              >
                {photo ? (
                  <img 
                    src={photo} 
                    className="options-user-photo" 
                    alt="Foto do jogador"
                  />
                ) : (
                  <div className="options-photo-placeholder">
                    <FiUser className="options-user-icon" />
                  </div>
                )}
                <div className="options-camera-icon">
                  <FiCamera />
                </div>
              </button>
            </div>

            {/* Nome do jogador */}
            <h2 className="options-user-name">{name}</h2>

            {/* Opções de configuração */}
            <div className="options-list">
              <Link to="/Redfine" className="options-link">
                <div className="options-item option-item-hover">
                  <FiLock className="options-icon" />
                  <span className="options-text">Trocar Senha</span>
                  <div className="options-arrow">›</div>
                </div>
              </Link>

              <Link to="/DeleteAccount" className="options-link">
                <div className="options-item option-item-hover">
                  <FiTrash2 className="options-icon" />
                  <span className="options-text">Deletar Conta</span>
                  <div className="options-arrow">›</div>
                </div>
              </Link>

              <button 
                onClick={handleLogout} 
                className="options-button"
              >
                <div className="options-item option-item-hover">
                  <FiLogOut className="options-icon" />
                  <span className="options-text">Sair</span>
                  <div className="options-arrow">›</div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Barra de navegação inferior */}
        <footer className="options-bottom-bar">
          <button 
            onClick={() => navigate('/HomeDecker')}
            className="options-nav-button nav-button-hover"
            aria-label="Decks"
          >
            <FiGrid className="options-nav-icon" />
            <span className="options-nav-label">Decks</span>
          </button>

          <button 
            onClick={() => navigate('/HomePlayer')}
            className="options-nav-button nav-button-hover"
            aria-label="Player"
          >
            <FiUser className="options-nav-icon" />
            <span className="options-nav-label">Player</span>
          </button>

          <button 
            onClick={() => navigate('/Options')}
            className="options-active-nav-button"
            aria-label="Opções"
          >
            <FiSettings className="options-active-icon" />
            <span className="options-active-label">Opções</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Options;