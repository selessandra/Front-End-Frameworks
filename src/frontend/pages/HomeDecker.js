import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiGrid, 
  FiUser,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiHelpCircle,
  FiRefreshCw
} from 'react-icons/fi';
import api from '../services/api';
import '../assets/HomeDecker.css';

// Função para gerar placeholder local
const generatePlaceholder = (text = 'Carta', width = 70, height = 90) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4B1664';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width/2, height/2);
  return canvas.toDataURL();
};

const placeholderCache = {};
const getPlaceholder = (cardName = 'Carta') => {
  if (!placeholderCache[cardName]) {
    placeholderCache[cardName] = generatePlaceholder(cardName);
  }
  return placeholderCache[cardName];
};

const HomeDecker = () => {
  const navigate = useNavigate();
  const [leaderDecks, setLeaderDecks] = useState([]);
  const [deckOfTheDay, setDeckOfTheDay] = useState(null);
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Processa os dados do deck popular da API
  // Processa os dados do deck popular da API
const processDeckData = (apiData) => {
  console.log('Processando dados do deck:', apiData);
  
  if (!apiData) return null;
  
  // Se for um array (como mostrou o console.log: [0: {cards: [...], usage: ...}])
  if (Array.isArray(apiData) && apiData.length > 0) {
    // Pega o primeiro item do array (que é o deck popular)
    const deckData = apiData[0];
    console.log('Deck data do array:', deckData);
    
    return {
      name: deckData.name || 'Deck Popular do Dia',
      player: deckData.player || 'Comunidade',
      trophies: deckData.trophies || 0,
      winRate: deckData.winRate || deckData.wins_percent || '0%',
      usage: deckData.usage || deckData.usage_percent || '0',
      averageElixir: deckData.averageElixir || 3.8,
      deck: (deckData.cards || []).map(card => ({
        name: card.name || card.alt || 'Carta',
        icon: card.icon || card.image || null
      }))
    };
  }
  
  // Se vier com a estrutura {best: {...}} (do deckapi.js)
  if (apiData.best) {
    return {
      name: apiData.best.name || 'Deck Popular',
      player: 'Popular',
      trophies: 0,
      winRate: apiData.best.winrate || '0%',
      usage: apiData.best.usage || '0',
      averageElixir: 3.8,
      deck: (apiData.best.cards || []).map(card => ({
        name: card.alt || card.name || 'Carta',
        icon: card.image || card.icon || null
      }))
    };
  }
  
  // Se vier direto com estrutura de cards
  if (apiData.cards) {
    return {
      name: apiData.name || 'Deck Popular',
      player: apiData.player || 'Popular',
      trophies: apiData.trophies || 0,
      winRate: apiData.winrate || apiData.wins_percent || '0%',
      usage: apiData.usage || apiData.usage_percent || '0',
      averageElixir: apiData.averageElixir || 3.8,
      deck: apiData.cards.map(card => ({
        name: card.alt || card.name || 'Carta',
        icon: card.image || card.icon || null
      }))
    };
  }
  
  console.log('Nenhuma estrutura reconhecida, retornando null');
  return null;
};
  // Processa os dados dos líderes da API
  const processLeadersData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    return apiData.map((leader, index) => {
      // Se já vier formatado pelo backend (leaders.js formatLeadersForFrontend)
      if (leader.deck && Array.isArray(leader.deck)) {
        return {
          id: leader.id || index + 1,
          name: leader.name || `Jogador ${index + 1}`,
          player: leader.playerName || leader.name || `Jogador ${index + 1}`,
          position: leader.position || index + 1,
          trophies: leader.trophies || leader.rating || 3000 + (10 - index) * 100,
          winRate: leader.winRate || '65%',
          usage: leader.usage || `${10 + index}%`,
          deck: leader.deck.map(card => ({
            name: card.name || card.alt || 'Carta',
            icon: card.icon || card.image || null
          }))
        };
      }
      
      // Se vier da função fetchLeaders direta
      if (leader.deckCards) {
        return {
          id: index + 1,
          name: leader.playerName || `Deck ${index + 1}`,
          player: leader.playerName || `Jogador ${index + 1}`,
          position: index + 1,
          trophies: parseInt(leader.rating) || 3000 + (10 - index) * 100,
          winRate: '65%', // Não disponível no scraper atual
          usage: `${10 + index}%`, // Placeholder
          deck: (leader.deckCards || []).map(card => ({
            name: card.name || card.alt || 'Carta',
            icon: card.icon || card.image || null
          }))
        };
      }
      
      // Fallback
      return {
        id: index + 1,
        name: `Deck ${index + 1}`,
        player: `Jogador ${index + 1}`,
        position: index + 1,
        trophies: 3000 + (10 - index) * 100,
        winRate: '65%',
        usage: `${10 + index}%`,
        deck: Array(8).fill().map((_, i) => ({
          name: `Carta ${i + 1}`,
          icon: null
        }))
      };
    });
  };

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Buscando dados da API...');
      
      // Busca deck popular do dia
      const popularResponse = await api.get('/decks/popular');
      console.log('Resposta popular:', popularResponse.data);
      
      const processedPopular = processDeckData(popularResponse.data);
      setDeckOfTheDay(processedPopular);
      
      // Busca top leaders
      const leadersResponse = await api.get('/decks/leaders', {
        params: { limit: 5 }
      });
      console.log('Resposta leaders:', leadersResponse.data);
      
      const processedLeaders = processLeadersData(leadersResponse.data);
      setLeaderDecks(processedLeaders);
      
      // Se não tiver dados, usa mock
      if (!processedPopular && processedLeaders.length === 0) {
        console.log('Usando dados mock...');
        loadMockData();
      } else {
        console.log('Dados processados:', {
          popular: processedPopular,
          leaders: processedLeaders
        });
      }
      
    } catch (err) {
      console.error('Erro completo ao buscar dados:', err);
      setError(`Não foi possível carregar os decks. Erro: ${err.message}`);
      loadMockData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Dados mock apenas se API falhar
  const loadMockData = () => {
    console.log('Carregando dados mock...');
    
    const mockLeaders = [
      { 
        id: 1, 
        name: 'Mega Cavaleiro', 
        player: 'Top Player #1',
        position: 1,
        trophies: 3500, 
        winRate: '72%',
        usage: '15%',
        deck: [
          { name: 'Mega Cavaleiro', icon: 'https://clashroyale.com/images/cards/full/megaknight.png' },
          { name: 'Feiticeira', icon: 'https://clashroyale.com/images/cards/full/witch.png' },
          { name: 'Bola de Fogo', icon: 'https://clashroyale.com/images/cards/full/fireball.png' },
          { name: 'Gigante', icon: 'https://clashroyale.com/images/cards/full/giant.png' },
          { name: 'Arqueiras', icon: 'https://clashroyale.com/images/cards/full/archers.png' },
          { name: 'Dragão Inferno', icon: 'https://clashroyale.com/images/cards/full/infernodragon.png' },
          { name: 'Esqueletos', icon: 'https://clashroyale.com/images/cards/full/skeletons.png' },
          { name: 'Tronco', icon: 'https://clashroyale.com/images/cards/full/thelog.png' }
        ]
      },
      { 
        id: 2, 
        name: 'X-Bow 2.9', 
        player: 'Top Player #2',
        position: 2,
        trophies: 3200, 
        winRate: '68%',
        usage: '12%',
        deck: [
          { name: 'X-Bow', icon: 'https://clashroyale.com/images/cards/full/xbow.png' },
          { name: 'Tesla', icon: 'https://clashroyale.com/images/cards/full/tesla.png' },
          { name: 'Esqueletos', icon: 'https://clashroyale.com/images/cards/full/skeletons.png' },
          { name: 'Gelo', icon: 'https://clashroyale.com/images/cards/full/icespirit.png' },
          { name: 'Flechas', icon: 'https://clashroyale.com/images/cards/full/arrows.png' },
          { name: 'Arqueiros', icon: 'https://clashroyale.com/images/cards/full/archers.png' },
          { name: 'Golem de Gelo', icon: 'https://clashroyale.com/images/cards/full/icegolem.png' },
          { name: 'Tronco', icon: 'https://clashroyale.com/images/cards/full/thelog.png' }
        ]
      },
      { 
        id: 3, 
        name: 'Golem Noite', 
        player: 'Top Player #3',
        position: 3,
        trophies: 3100, 
        winRate: '65%',
        usage: '10%',
        deck: [
          { name: 'Golem', icon: 'https://clashroyale.com/images/cards/full/golem.png' },
          { name: 'Bebê Dragão', icon: 'https://clashroyale.com/images/cards/full/babydragon.png' },
          { name: 'Feiticeira Noturna', icon: 'https://clashroyale.com/images/cards/full/nightwitch.png' },
          { name: 'Mega Minion', icon: 'https://clashroyale.com/images/cards/full/megaminion.png' },
          { name: 'Coletor', icon: 'https://clashroyale.com/images/cards/full/elixircollector.png' },
          { name: 'Tronco', icon: 'https://clashroyale.com/images/cards/full/thelog.png' },
          { name: 'Flechas', icon: 'https://clashroyale.com/images/cards/full/arrows.png' },
          { name: 'Lapidação', icon: 'https://clashroyale.com/images/cards/full/lightning.png' }
        ]
      }
    ];

    const mockPopularDeck = {
      id: 1,
      name: 'Electro Giant Control',
      player: 'Deck do Dia',
      trophies: 3450,
      winRate: '67%',
      usage: '2.5K',
      averageElixir: 3.8,
      deck: [
        { name: 'Electro Giant', icon: 'https://clashroyale.com/images/cards/full/electrogiant.png' },
        { name: 'Tornado', icon: 'https://clashroyale.com/images/cards/full/tornado.png' },
        { name: 'Bola Raios', icon: 'https://clashroyale.com/images/cards/full/lightning.png' },
        { name: 'Mago', icon: 'https://clashroyale.com/images/cards/full/wizard.png' },
        { name: 'Tesla', icon: 'https://clashroyale.com/images/cards/full/tesla.png' },
        { name: 'Esqueletos', icon: 'https://clashroyale.com/images/cards/full/skeletons.png' },
        { name: 'Gelo', icon: 'https://clashroyale.com/images/cards/full/icespirit.png' },
        { name: 'Flechas', icon: 'https://clashroyale.com/images/cards/full/arrows.png' }
      ]
    };

    setLeaderDecks(mockLeaders);
    setDeckOfTheDay(mockPopularDeck);
    setError(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const nextLeader = () => {
    if (leaderDecks.length > 0) {
      setCurrentLeaderIndex(prev => 
        prev === leaderDecks.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevLeader = () => {
    if (leaderDecks.length > 0) {
      setCurrentLeaderIndex(prev => 
        prev === 0 ? leaderDecks.length - 1 : prev - 1
      );
    }
  };

  const currentLeader = leaderDecks[currentLeaderIndex] || leaderDecks[0];

  const renderDeckGrid = (cards) => {
    if (!cards || cards.length === 0) {
      return (
        <div className="deck-empty-message">
          <p>Nenhuma carta no deck</p>
        </div>
      );
    }

    const deckCards = Array.isArray(cards) ? [...cards] : [];
    while (deckCards.length < 8) {
      deckCards.push({ icon: null, name: '' });
    }

    const rows = [deckCards.slice(0, 4), deckCards.slice(4, 8)];

    

    return (
      <div className="deck-grid-container">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="deck-row">
            {row.map((card, cardIndex) => {
              const hasImage = card?.icon && card.icon !== null;
              const cardName = card?.name || `Carta ${rowIndex * 4 + cardIndex + 1}`;
              
              return (
                <div key={`card-${rowIndex}-${cardIndex}`} className="card-box">
                  {hasImage ? (
                    <img
                      src={card.icon}
                      className="card-image-new"
                      alt={cardName}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPlaceholder(cardName);
                        e.target.style.objectFit = 'cover';
                      }}
                    />
                  ) : (
                    <div className="card-placeholder">
                      <FiHelpCircle className="help-icon" />
                      <span className="placeholder-label">{cardName}</span>
                    </div>
                  )}
                  <div className="card-name-overlay">
                    <span className="card-name-text">
                      {cardName}
                    </span>
                    <span className="card-elixir-badge">
                      {getElixirCost(cardName)}⚡
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  if (loading && !refreshing) {
    return (
      <div className="loading-container">
        <div className="overlay" />
        <div className="loading-content">
          <div className="spinner" />
          <p className="loading-text">Carregando decks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Erro ao carregar dados</h2>
        <p>{error}</p>
        <div className="error-buttons">
          <button onClick={handleRefresh} className="retry-button">
            <FiRefreshCw /> Tentar novamente
          </button>
          <button onClick={() => navigate('/HomePlayer')} className="back-button">
            Voltar ao Perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-decker-container">
      <div className="home-decker-background-image">
        <div className="home-decker-overlay" />
        
        <header className="home-decker-header">
          <h1 className="home-decker-title">Decks</h1>
          <button 
            onClick={handleRefresh} 
            className="refresh-button"
            disabled={refreshing}
            title="Atualizar dados"
          >
            <FiRefreshCw className={refreshing ? 'spinning' : ''} />
          </button>
        </header>

        <main className="home-decker-main-content">
          <div className="home-decker-columns-container">
            <div className="home-decker-left-column">
              <div className="home-decker-deck-section">
                <div className="home-decker-section-header">
                  <FiStar className="home-decker-section-icon" />
                  <h2 className="home-decker-section-title">Deck Popular do Dia</h2>
                </div>
                
                {deckOfTheDay ? (
                  <div className="home-decker-deck-card">
                    <div className="home-decker-deck-header">
                      <div className="home-decker-deck-header-left">
                        <h3 className="home-decker-deck-name">{deckOfTheDay.name}</h3>
                        <p className="home-decker-deck-player">{deckOfTheDay.player || 'Deck Popular'}</p>
                      </div>
                      <div className="home-decker-deck-stats">
                        <div className="home-decker-stat-item">
                          <span className="home-decker-stat-icon">📈</span>
                          <span className="home-decker-stat-value">{deckOfTheDay.winRate || 'N/A'}</span>
                        </div>
                        <div className="home-decker-stat-item">
                          <span className="home-decker-stat-icon">👥</span>
                          <span className="home-decker-stat-value">{deckOfTheDay.usage || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="home-decker-deck-wrapper">
                      <h3 className="home-decker-deck-title">Cartas do Deck:</h3>
                      {renderDeckGrid(deckOfTheDay.deck || [])}
                    </div>
                    
                    <div className="home-decker-deck-info">
                      <div className="home-decker-info-item">
                        <span className="home-decker-info-label">Custo Médio:</span>
                        <span className="home-decker-info-value">{deckOfTheDay.averageElixir || '3.8'}⚡</span>
                      </div>
                      <div className="home-decker-info-item">
                        <span className="home-decker-info-label">Cartas:</span>
                        <span className="home-decker-info-value">8</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-data-message">
                    <p>Nenhum deck popular disponível no momento</p>
                  </div>
                )}
              </div>
            </div>

            <div className="home-decker-right-column">
              <div className="home-decker-leaders-section">
                <div className="home-decker-section-header">
                  <FiTrendingUp className="home-decker-section-icon" />
                  <h2 className="home-decker-section-title">Top Leaders</h2>
                </div>
                
                <div className="home-decker-carousel-container">
                  <div className="home-decker-carousel-controls">
                    <button onClick={prevLeader} className="home-decker-nav-button nav-button" disabled={leaderDecks.length <= 1}>
                      <FiChevronLeft />
                    </button>
                    
                    <div className="home-decker-carousel-counter">
                      <span className="home-decker-counter-text">
                        {currentLeaderIndex + 1} / {leaderDecks.length}
                      </span>
                    </div>
                    
                    <button onClick={nextLeader} className="home-decker-nav-button nav-button" disabled={leaderDecks.length <= 1}>
                      <FiChevronRight />
                    </button>
                  </div>
                  
                  {currentLeader && leaderDecks.length > 0 ? (
                    <div className="home-decker-leader-card">
                      <div className="home-decker-leader-header">
                        <div className="home-decker-leader-header-left">
                          <h3 className="home-decker-leader-name">
                            #{currentLeader.position} {currentLeader.name}
                          </h3>
                          <p className="home-decker-leader-player">{currentLeader.player}</p>
                        </div>
                        <div className="home-decker-trophy-badge">
                          <span className="home-decker-trophy-icon">🏆</span>
                          <span className="home-decker-trophy-value">{currentLeader.trophies}</span>
                        </div>
                      </div>
                      
                      <div className="home-decker-deck-wrapper">
                        <h3 className="home-decker-deck-title">Cartas do Deck:</h3>
                        {renderDeckGrid(currentLeader.deck || [])}
                      </div>
                      
                      <div className="home-decker-leader-stats">
                        <div className="home-decker-leader-stat">
                          <span className="home-decker-leader-stat-label">Taxa de Vitória</span>
                          <span className="home-decker-leader-stat-value">{currentLeader.winRate || 'N/A'}</span>
                        </div>
                        <div className="home-decker-leader-stat">
                          <span className="home-decker-leader-stat-label">Uso Global</span>
                          <span className="home-decker-leader-stat-value">{currentLeader.usage || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-data-message">
                      <p>Nenhum líder disponível no momento</p>
                    </div>
                  )}
                  
                  {leaderDecks.length > 0 && (
                    <div className="home-decker-leader-indicators">
                      {leaderDecks.map((deck, index) => (
                        <div 
                          key={deck.id || index}
                          onClick={() => setCurrentLeaderIndex(index)}
                          className={`home-decker-indicator-item ${index === currentLeaderIndex ? 'active' : ''}`}
                        >
                          <div className="home-decker-indicator-content">
                            <span className="home-decker-indicator-name">{deck.name}</span>
                            <span className="home-decker-indicator-trophy">🏆 {deck.trophies}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="home-decker-bottom-bar">
          <button 
            onClick={() => navigate('/HomeDecker')}
            className="home-decker-active-nav-button active-nav-button"
          >
            <FiGrid className="home-decker-active-icon" />
            <span className="home-decker-active-label">Decks</span>
          </button>

          <button 
            onClick={() => navigate('/HomePlayer')}
            className="home-decker-nav-button-footer nav-button-footer"
          >
            <FiUser className="home-decker-nav-icon" />
            <span className="home-decker-nav-label">Player</span>
          </button>

          <button 
            onClick={() => navigate('/Options')}
            className="home-decker-nav-button-footer nav-button-footer"
          >
            <FiSettings className="home-decker-nav-icon" />
            <span className="home-decker-nav-label">Opções</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

const getElixirCost = (cardName) => {
  const costs = {
    'Esqueletos': 1, 'Gelo': 2, 'Tronco': 2, 'Zap': 2, 'Arqueiras': 3,
    'Flechas': 3, 'Miner': 3, 'Tesla': 4, 'Bola de Fogo': 4, 'Feiticeira': 5,
    'Gigante': 5, 'Mega Cavaleiro': 7, 'Golem': 8, 'Electro Giant': 7,
    'Tornado': 3, 'Bola Raios': 6, 'Mago': 5, 'Princesa': 3, 'Cavaleiro': 3,
    'Rocha': 4, 'PEKKA': 7, 'Bandeira': 4, 'Bruxa': 5, 'Poção': 4, 'E-Wiz': 4,
    'Arqueiros': 3, 'Golem de Gelo': 3, 'Bebê Dragão': 4, 'Feiticeira Noturna': 4,
    'Mega Minion': 3, 'Coletor': 5, 'Lapidação': 3, 'Gangue Duendes': 2,
    'Barril Duendes': 3, 'X-Bow': 6, 'Torre Inferno': 5, 'Ice Spirit': 1,
    'Lightning': 6, 'Night Witch': 4, 'Elixir Collector': 6, 'Rocket': 6,
    'Battle Ram': 4, 'Poison': 4, 'Electro Wizard': 4, 'Inferno Dragon': 4,
    'Dragão Inferno': 4, 'Bola de Fogo': 4, 'Mega Minion': 3, 'Coletor': 5,
    'Lapidação': 3, 'X-Bow': 6, 'Tesla': 4, 'Ice Spirit': 1, 'Arqueiros': 3,
    'Golem de Gelo': 3, 'Tronco': 2, 'Flechas': 3, 'Golem': 8, 'Bebê Dragão': 4,
    'Feiticeira Noturna': 4, 'Mega Minion': 3, 'Elixir Collector': 6,
    'Lightning': 6, 'Night Witch': 4, 'Rocket': 6, 'Battle Ram': 4, 'Poison': 4,
    'Electro Wizard': 4, 'Inferno Dragon': 4
  };
  
  if (costs[cardName]) return costs[cardName];
  
  const partialMatch = Object.keys(costs).find(key => 
    cardName.toLowerCase().includes(key.toLowerCase())
  );
  
  return partialMatch ? costs[partialMatch] : 4;
};

export default HomeDecker;