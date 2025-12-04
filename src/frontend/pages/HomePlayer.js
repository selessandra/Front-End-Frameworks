import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiUser, 
  FiGrid, 
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';

// Removendo imports de CSS que não existem
// Vamos usar CSS inline/estilos no próprio arquivo

export default function HomePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado local para os dados do jogador
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

  // ===========================
  //  BOTÃO VOLTAR → ALERTA DE SAÍDA
  // ===========================
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

  // ===========================
  // CARREGA DADOS DO LOCALSTORAGE
  // ===========================
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
          const updatedPlayer = { ...player, photo: newPhoto };
          setPlayer(updatedPlayer);
          localStorage.setItem('clashhub_player', JSON.stringify(updatedPlayer));
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }, [player]);

  // ===========================
  //  GRADE DO DECK
  // ===========================
  const renderDeckGrid = useCallback(() => {
    // Garante que temos sempre 8 cartas
    const cards = [...deck];
    while (cards.length < 8) cards.push({ icon: null });

    const rows = [cards.slice(0, 4), cards.slice(4, 8)];

    return (
      <div style={styles.deckGridContainer}>
        {rows.map((row, idx) => (
          <div
            key={`row-${idx}`}
            style={styles.deckRow}
          >
            {row.map((card, i) => (
              <div key={`card-${idx}-${i}`} style={styles.cardBox}>
                {card.icon ? (
                  <img
                    src={card.icon}
                    style={styles.cardImageNew}
                    alt="Carta do deck"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/70x90/4B1664/FFFFFF?text=Carta';
                    }}
                  />
                ) : (
                  <div style={styles.cardPlaceholder}>
                    <FiHelpCircle style={styles.helpIcon} />
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
    <div style={styles.appContainer}>
      <div 
        style={{
          ...styles.backgroundImage,
          backgroundImage: `url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
        }}
      >
        <div style={styles.overlay} />

        <h1 style={styles.homeText}>Perfil</h1>

        <main style={styles.homeContainer}>

          {/* INFO SUPERIOR */}
          <div style={styles.compactHeader}>
            <div style={styles.photoAndLevel}>
              <div style={styles.levelBadge}>
                <span style={styles.levelText}>Nv {expLevel}</span>
              </div>
              
              <button 
                onClick={pickImage} 
                style={styles.photoButton}
                aria-label="Alterar foto do perfil"
                type="button"
              >
                {photo ? (
                  <img 
                    src={photo} 
                    style={styles.userImage} 
                    alt={`Foto de ${nome}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `
                        <div style="${styles.userIconFallback}">
                          <FiUser />
                        </div>`;
                    }}
                  />
                ) : (
                  <div style={styles.userIconFallback}>
                    <FiUser style={styles.userIcon} />
                  </div>
                )}
              </button>
            </div>

            {/* NOME E CLÃ */}
            <div style={styles.nameAndClan}>
              <h2 style={styles.playerName}>{nome}</h2>
              <p style={styles.clanText}>
                <span style={styles.clanLabel}>Clã:</span> 
                <span style={styles.highlight}> {clanName}</span>
              </p>
            </div>
          </div>

          {/* ESTATÍSTICAS  */}
          <div style={styles.statsContainer}>
            <div style={styles.statsGrid}>
              <div style={styles.statItemMini}>
                <div style={styles.statIconMini}>🏆</div>
                <div style={styles.statLabelMini}>TROF</div>
                <div style={styles.statValueMini}>{trofeus}</div>
              </div>
              
              <div style={styles.statItemMini}>
                <div style={styles.statIconMini}>⭐</div>
                <div style={styles.statLabelMini}>TOP</div>
                <div style={styles.statValueMini}>{topTrofeus}</div>
              </div>
              
              <div style={styles.statItemMini}>
                <div style={styles.statIconMini}>🏅</div>
                <div style={styles.statLabelMini}>VIT</div>
                <div style={styles.statValueMini}>{wins}</div>
              </div>
              
              <div style={styles.statItemMini}>
                <div style={styles.statIconMini}>❌</div>
                <div style={styles.statLabelMini}>DER</div>
                <div style={styles.statValueMini}>{losses}</div>
              </div>
            </div>
          </div>

          {/* DECK ATUAL  */}
          <section style={styles.deckWrapper}>
            <h3 style={styles.deckTitle}>Deck Atual</h3>
            {renderDeckGrid()}
          </section>

        </main>

        <footer style={styles.bottomBar}>
          <button 
            onClick={() => navigate('/HomeDecker')}
            style={styles.navButton}
            aria-label="Ir para Deck Builder"
            type="button"
          >
            <FiGrid style={styles.navIcon} />
            <span style={styles.navLabel}>Deck</span>
          </button>

          <button 
            onClick={() => navigate('/HomePlayer')}
            style={{...styles.navButton, ...styles.activeNav}}
            aria-label="Página atual do Player"
            type="button"
          >
            <FiUser style={{...styles.navIcon, color: '#4B1664'}} />
            <span style={{...styles.navLabel, color: '#4B1664', fontWeight: 'bold'}}>Player</span>
          </button>

          <button 
            onClick={() => navigate('/HomeOptions')}
            style={styles.navButton}
            aria-label="Configurações"
            type="button"
          >
            <FiSettings style={styles.navIcon} />
            <span style={styles.navLabel}>Opções</span>
          </button>
        </footer>

      </div>
    </div>
  );
}

// Estilos inline (substituem o CSS externo)
const styles = {
  appContainer: {
    width: '100%',
    minHeight: '100vh',
  },
  backgroundImage: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  homeText: {
    position: 'relative',
    color: 'white',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '12px 20px 8px 20px',
    margin: 0,
  },
  homeContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px 20px 80px 20px',
    gap: '10px',
    flex: 1,
  },
  
  // HEADER SUPER COMPACTO
  compactHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '5px',
  },
  photoAndLevel: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'rgba(75, 22, 100, 0.9)',
    borderRadius: '12px',
    padding: '3px 8px',
    zIndex: 10,
    border: '2px solid #ffd700',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  levelText: {
    color: '#ffd700',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  
  // FOTO
  photoButton: {
    backgroundColor: 'transparent',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    cursor: 'pointer',
    width: '110px',
    height: '110px',
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  userImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  userIconFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: '70px',
    height: '70px',
    color: 'white',
  },
  
  // NOME E CLÃ
  nameAndClan: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  playerName: {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0 0 3px 0',
    textAlign: 'left',
    lineHeight: 1.2,
  },
  clanText: {
    color: '#e0e0e0',
    fontSize: '14px',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  clanLabel: {
    color: '#e0e0e0',
  },
  highlight: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  
  // ESTATÍSTICAS MINI
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: '10px',
    padding: '8px 12px',
    width: '95%',
    maxWidth: '500px',
    backdropFilter: 'blur(6px)',
    marginBottom: '5px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  statsGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  statItemMini: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '0',
    padding: '0 2px',
  },
  statIconMini: {
    fontSize: '18px',
    marginBottom: '2px',
  },
  statLabelMini: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '9px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '1px',
    letterSpacing: '0.5px',
  },
  statValueMini: {
    color: '#ffd700',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // DECK WRAPPER - MAIS PARA CIMA
  deckWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '60px',
    width: '95%',
    maxWidth: '500px',
    marginTop: '1px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxHeight: "400px"
  },
  deckTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '1px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  deckGridContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    justifyContent: 'center',
    
  },
  deckRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
  },
  cardBox: {
    width: '78px',
    height: '98px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  cardImageNew: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '6px',
  },
  cardPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  helpIcon: {
    width: '34px',
    height: '34px',
    color: '#aaa',
  },
  
  // BOTTOM BAR COM GLASSMORPHISM
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '15px 0',
    zIndex: 1000,
    boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.1)',
  },
  navButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 20px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    minWidth: '80px',
  },
  activeNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#4B1664',
    boxShadow: '0 4px 15px rgba(75, 22, 100, 0.2)',
  },
  navIcon: {
    width: '28px',
    height: '28px',
    transition: 'all 0.3s ease',
  },
  navLabel: {
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
};

// Estilos responsivos
const mediaStyles = {
  '@media (max-width: 600px)': {
    homeText: {
      fontSize: '22px',
      padding: '10px 20px 6px 20px',
    },
    playerName: {
      fontSize: '20px',
    },
    photoButton: {
      width: '100px',
      height: '100px',
    },
    userIcon: {
      width: '60px',
      height: '60px',
    },
    levelBadge: {
      top: '-6px',
      right: '-6px',
      padding: '2px 6px',
    },
    levelText: {
      fontSize: '11px',
    },
    deckWrapper: {
      padding: '14px',
      marginTop: '3px',
    },
    cardBox: {
      width: '68px',
      height: '88px',
    },
    statsContainer: {
      padding: '6px 10px',
    },
    statIconMini: {
      fontSize: '16px',
    },
    statValueMini: {
      fontSize: '13px',
    },
    statLabelMini: {
      fontSize: '8px',
    },
    navButton: {
      minWidth: '70px',
      padding: '6px 15px',
    },
    navIcon: {
      width: '24px',
      height: '24px',
    },
  },
  '@media (max-width: 400px)': {
    deckRow: {
      gap: '8px',
    },
    cardBox: {
      width: '58px',
      height: '78px',
    },
    statsContainer: {
      padding: '5px 8px',
    },
    statItemMini: {
      padding: '0 1px',
    },
    statIconMini: {
      fontSize: '15px',
    },
    statValueMini: {
      fontSize: '12px',
    },
    statLabelMini: {
      fontSize: '7px',
    },
    navButton: {
      minWidth: '60px',
      padding: '5px 10px',
    },
    compactHeader: {
      gap: '10px',
    },
    photoButton: {
      width: '90px',
      height: '90px',
    },
    userIcon: {
      width: '55px',
      height: '55px',
    },
    playerName: {
      fontSize: '18px',
    },
    clanText: {
      fontSize: '12px',
    },
  },
  '@media (max-width: 350px)': {
    deckRow: {
      gap: '6px',
    },
    cardBox: {
      width: '52px',
      height: '72px',
    },
    statsGrid: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8px',
    },
    statItemMini: {
      minWidth: '65px',
    },
    homeContainer: {
      padding: '5px 15px 80px 15px',
    },
  },
};