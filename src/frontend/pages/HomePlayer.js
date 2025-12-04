import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiUser, 
  FiGrid, 
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import '../assets/HomePlayer.css';

export default function HomePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [player, setPlayer] = useState({
    nome: 'Jogador Clash',
    clanName: 'Clã dos Campeões',
    trofeus: 2450,
    topTrofeus: 2800,
    wins: 150,
    losses: 75,
    expLevel: 12,
    deck: [
      { icon: 'https://clashroyale.com/images/cards/full/minipekka.png' },
      { icon: 'https://clashroyale.com/images/cards/full/musketeer.png' },
      { icon: 'https://clashroyale.com/images/cards/full/fireball.png' },
      { icon: 'https://clashroyale.com/images/cards/full/giant.png' },
      { icon: 'https://clashroyale.com/images/cards/full/archers.png' },
      { icon: null },
      { icon: null },
      { icon: null }
    ],
    photo: null
  });

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

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "Você deseja fechar o ClashHub?";
      e.returnValue = message;
      return message;
    };

    const handlePopState = () => {
      if (window.confirm("Você deseja fechar o ClashHub?")) {
        window.close();
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    window.history.pushState(null, '', window.location.pathname);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const loadPlayerData = () => {
      const savedData = localStorage.getItem('clashhub_player');
      if (savedData) {
        try {
          setPlayer(JSON.parse(savedData));
        } catch (error) {
          console.error('Erro ao carregar dados do jogador:', error);
        }
      }
    };

    loadPlayerData();
  }, [location.pathname]);

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
          const updatedPlayer = { ...player, photo: newPhoto };
          setPlayer(updatedPlayer);
          localStorage.setItem('clashhub_player', JSON.stringify(updatedPlayer));
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }, [player]);

  const renderDeckGrid = useCallback(() => {
    const cards = [...deck];
    while (cards.length < 8) cards.push({ icon: null });

    const rows = [cards.slice(0, 4), cards.slice(4, 8)];

    return (
      <div className="deck-grid-container">
        {rows.map((row, idx) => (
          <div
            key={`row-${idx}`}
            className="deck-row"
          >
            {row.map((card, i) => (
              <div key={`card-${idx}-${i}`} className="card-box">
                {card.icon ? (
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

  return (
    <div className="home-player-app-container">
      <div 
        className="home-player-background-image"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)` 
        }}
      >
        <div className="home-player-overlay" />

        <h1 className="home-player-home-text">Perfil</h1>

        <main className="home-player-home-container">

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
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = 'home-player-user-icon-fallback';
                      fallbackDiv.innerHTML = '<FiUser />';
                      e.target.parentElement.replaceChild(fallbackDiv, e.target);
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
                <span className="home-player-highlight"> {clanName}</span>
              </p>
            </div>
          </div>

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

          <section className="home-player-deck-wrapper">
            <h3 className="home-player-deck-title">Deck Atual</h3>
            {renderDeckGrid()}
          </section>

        </main>

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