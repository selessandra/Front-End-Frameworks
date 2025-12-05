import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiGrid, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { usePlayer } from '../../contexts/PlayerContext';
import '../assets/HomePlayer.css';

export default function HomePlayer() {
  const navigate = useNavigate();
  const {
    player,
    loading,
    error,
    loadPlayerData,
    updatePhoto
  } = usePlayer();

  const {
    nome,
    clanName,
    trofeus,
    topTrofeus,
    wins,
    losses,
    expLevel,
    deck,
    photo
  } = player;

  // ===========================
  //  TRATAMENTO DO BOTÃO VOLTAR
  // ===========================
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "Você deseja fechar o ClashHub?";
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ===========================
  // CARREGA DADOS AO ENTRAR
  // ===========================
  useEffect(() => {
    loadPlayerData();
  }, []);

  // ===========================
  // ALTERAR FOTO
  // ===========================
  const pickImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPhoto = event.target.result;
          updatePhoto(newPhoto);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }, [updatePhoto]);

  // ===========================
  //  RENDERIZAÇÃO DO DECK
  // ===========================
  const renderDeckGrid = useCallback(() => {
    if (!deck || deck.length === 0) {
      return (
        <div className="deck-empty-message">
          <p>Nenhum deck cadastrado</p>
        </div>
      );
    }

    const cards = [...deck];
    while (cards.length < 8) cards.push({ icon: null });

    const rows = [cards.slice(0, 4), cards.slice(4, 8)];

    return (
      <div className="deck-grid-container">
        {rows.map((row, idx) => (
          <div key={`row-${idx}`} className="deck-row">
            {row.map((card, i) => (
              <div key={`card-${idx}-${i}`} className="card-box">
                {card?.icon ? (
                  <img
                    src={card.icon}
                    className="card-image-new"
                    alt="Carta do deck"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/70x90/4B1664/FFFFFF?text=Carta';
                    }}
                  />
                ) : (
                  <div className="card-placeholder">
                    <FiHelpCircle className="help-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }, [deck]);

  // ===========================
  //  MANUSEIO DE LOGOUT
  // ===========================
  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('clashhub_player');
      navigate('/');
    }
  };

  // ===========================
  //  RENDERIZAÇÃO DE LOADING
  // ===========================
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando dados do jogador...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Erro ao carregar dados</h2>
        <p>{error}</p>
        <button onClick={loadPlayerData} className="retry-button">
          Tentar novamente
        </button>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="home-player-app-container">
      <div 
        className="home-player-background-image"
        style={{ 
          backgroundImage: `url(${require('../assets/images/backgroundweb.jpg')})` 
        }}
      >
        <div className="home-player-overlay" />

        <header className="home-player-header">
          <h1 className="home-player-home-text">Perfil</h1>
          <button 
            onClick={handleLogout} 
            className="logout-header-button"
            aria-label="Sair"
            title="Sair"
          >
            Sair
          </button>
        </header>

        <main className="home-player-home-container">

          {/* INFO COMPACTA DO JOGADOR */}
          <div className="home-player-compact-header">
            <div className="home-player-photo-and-level">
              <div className="home-player-level-badge">
                <span className="home-player-level-text">Nv {expLevel}</span>
              </div>
              
              <button 
                onClick={pickImage} 
                className="home-player-photo-button"
                aria-label="Alterar foto do perfil"
                type="button"
              >
                {photo ? (
                  <img 
                    src={photo} 
                    className="home-player-user-image" 
                    alt={`Foto de ${nome}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100/4B1664/FFFFFF?text=Usuário';
                    }}
                  />
                ) : (
                  <div className="home-player-user-icon-fallback">
                    <FiUser className="home-player-user-icon" />
                  </div>
                )}
              </button>
            </div>

            <div className="home-player-name-and-clan">
              <h2 className="home-player-player-name">{nome}</h2>
              <p className="home-player-clan-text">
                <span className="home-player-clan-label">Clã:</span> 
                <span className="home-player-highlight"> {clanName || 'Sem clã'}</span>
              </p>
            </div>
          </div>

          {/* ESTATÍSTICAS */}
          <div className="home-player-stats-container">
            <div className="home-player-stats-grid">
              <div className="home-player-stat-item-mini">
                <div className="home-player-stat-icon-mini">🏆</div>
                <div className="home-player-stat-label-mini">TROF</div>
                <div className="home-player-stat-value-mini">{trofeus}</div>
              </div>
              
              <div className="home-player-stat-item-mini">
                <div className="home-player-stat-icon-mini">⭐</div>
                <div className="home-player-stat-label-mini">TOP</div>
                <div className="home-player-stat-value-mini">{topTrofeus}</div>
              </div>
              
              <div className="home-player-stat-item-mini">
                <div className="home-player-stat-icon-mini">🏅</div>
                <div className="home-player-stat-label-mini">VIT</div>
                <div className="home-player-stat-value-mini">{wins}</div>
              </div>
              
              <div className="home-player-stat-item-mini">
                <div className="home-player-stat-icon-mini">❌</div>
                <div className="home-player-stat-label-mini">DER</div>
                <div className="home-player-stat-value-mini">{losses}</div>
              </div>
            </div>
          </div>

          {/* DECK */}
          <section className="home-player-deck-wrapper">
            <h3 className="home-player-deck-title">Deck Atual</h3>
            {renderDeckGrid()}
          </section>

        </main>

        {/* NAVEGAÇÃO INFERIOR */}
        <footer className="home-player-bottom-bar">
          <button 
            onClick={() => navigate('/HomeDecker')}
            className="home-player-nav-button"
            aria-label="Ir para Deck Builder"
            type="button"
          >
            <FiGrid className="home-player-nav-icon" />
            <span className="home-player-nav-label">Deck</span>
          </button>

          <button 
            onClick={() => navigate('/HomePlayer')}
            className="home-player-nav-button home-player-active-nav"
            aria-label="Página atual do Player"
            type="button"
          >
            <FiUser className="home-player-nav-icon home-player-active-icon" />
            <span className="home-player-nav-label home-player-active-label">Player</span>
          </button>

          <button 
            onClick={() => navigate('/Options')}
            className="home-player-nav-button"
            aria-label="Configurações"
            type="button"
          >
            <FiSettings className="home-player-nav-icon" />
            <span className="home-player-nav-label">Opções</span>
          </button>
        </footer>

      </div>
    </div>
  );
}