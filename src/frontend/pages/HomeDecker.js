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
  FiHelpCircle
} from 'react-icons/fi';
import '../assets/HomeDecker.css';

const HomeDecker = () => {
    const navigate = useNavigate();
    const [leaderDecks, setLeaderDecks] = useState([]);
    const [deckOfTheDay, setDeckOfTheDay] = useState(null);
    const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockLeaderDecks = [
            { 
                id: 1, 
                name: 'Mega Cavaleiro', 
                player: 'Top Player #1',
                trophies: 3500, 
                winRate: '72%',
                cards: ['MC', 'FT', 'BF', 'GT', 'AR', 'TI', 'ES', 'TR'],
                cardNames: ['Mega Cavaleiro', 'Feiticeira', 'Bola de Fogo', 'Gigante', 'Arqueiras', 'Torre Inferno', 'Esqueletos', 'Tronco'],
                cardImages: [
                    'https://clashroyale.com/images/cards/full/megaknight.png',
                    'https://clashroyale.com/images/cards/full/witch.png',
                    'https://clashroyale.com/images/cards/full/fireball.png',
                    'https://clashroyale.com/images/cards/full/giant.png',
                    'https://clashroyale.com/images/cards/full/archers.png',
                    'https://clashroyale.com/images/cards/full/infernodragon.png',
                    'https://clashroyale.com/images/cards/full/skeletons.png',
                    'https://clashroyale.com/images/cards/full/thelog.png'
                ]
            },
            { 
                id: 2, 
                name: 'X-Bow 2.9', 
                player: 'Top Player #2',
                trophies: 3200, 
                winRate: '68%',
                cards: ['XB', 'TS', 'ES', 'GL', 'FL', 'AQ', 'GG', 'TR'],
                cardNames: ['X-Bow', 'Tesla', 'Esqueletos', 'Gelo', 'Flechas', 'Arqueiros', 'Golem de Gelo', 'Tronco'],
                cardImages: [
                    'https://clashroyale.com/images/cards/full/xbow.png',
                    'https://clashroyale.com/images/cards/full/tesla.png',
                    'https://clashroyale.com/images/cards/full/skeletons.png',
                    'https://clashroyale.com/images/cards/full/icespirit.png',
                    'https://clashroyale.com/images/cards/full/arrows.png',
                    'https://clashroyale.com/images/cards/full/archers.png',
                    'https://clashroyale.com/images/cards/full/icegolem.png',
                    'https://clashroyale.com/images/cards/full/thelog.png'
                ]
            },
            { 
                id: 3, 
                name: 'Golem Noite', 
                player: 'Top Player #3',
                trophies: 3100, 
                winRate: '65%',
                cards: ['GL', 'BD', 'FN', 'MM', 'CL', 'TR', 'FL', 'LP'],
                cardNames: ['Golem', 'Bebê Dragão', 'Feiticeira Noturna', 'Mega Minion', 'Coletor', 'Tronco', 'Flechas', 'Lapidação'],
                cardImages: [
                    'https://clashroyale.com/images/cards/full/golem.png',
                    'https://clashroyale.com/images/cards/full/babydragon.png',
                    'https://clashroyale.com/images/cards/full/nightwitch.png',
                    'https://clashroyale.com/images/cards/full/megaminion.png',
                    'https://clashroyale.com/images/cards/full/elixircollector.png',
                    'https://clashroyale.com/images/cards/full/thelog.png',
                    'https://clashroyale.com/images/cards/full/arrows.png',
                    'https://clashroyale.com/images/cards/full/lightning.png'
                ]
            },
            { 
                id: 4, 
                name: 'Log Bait', 
                player: 'Top Player #4',
                trophies: 3400, 
                winRate: '71%',
                cards: ['PR', 'GD', 'BD', 'CV', 'TR', 'TS', 'RC', 'FL'],
                cardNames: ['Princesa', 'Gangue Duendes', 'Barril Duendes', 'Cavaleiro', 'Tronco', 'Tesla', 'Rocha', 'Flechas'],
                cardImages: [
                    'https://clashroyale.com/images/cards/full/princess.png',
                    'https://clashroyale.com/images/cards/full/goblins.png',
                    'https://clashroyale.com/images/cards/full/goblinbarrel.png',
                    'https://clashroyale.com/images/cards/full/knight.png',
                    'https://clashroyale.com/images/cards/full/thelog.png',
                    'https://clashroyale.com/images/cards/full/tesla.png',
                    'https://clashroyale.com/images/cards/full/rocket.png',
                    'https://clashroyale.com/images/cards/full/arrows.png'
                ]
            },
            { 
                id: 5, 
                name: 'PEKKA Bridge', 
                player: 'Top Player #5',
                trophies: 3300, 
                winRate: '69%',
                cards: ['PK', 'BG', 'MG', 'BR', 'ZP', 'PC', 'MN', 'EW'],
                cardNames: ['PEKKA', 'Bandeira', 'Mago', 'Bruxa', 'Zap', 'Poção', 'Miner', 'E-Wiz'],
                cardImages: [
                    'https://clashroyale.com/images/cards/full/pekka.png',
                    'https://clashroyale.com/images/cards/full/battleram.png',
                    'https://clashroyale.com/images/cards/full/wizard.png',
                    'https://clashroyale.com/images/cards/full/witch.png',
                    'https://clashroyale.com/images/cards/full/zap.png',
                    'https://clashroyale.com/images/cards/full/poison.png',
                    'https://clashroyale.com/images/cards/full/miner.png',
                    'https://clashroyale.com/images/cards/full/electrowizard.png'
                ]
            }
        ];

        const mockDeckOfTheDay = {
            id: 1,
            name: 'Electro Giant Control',
            player: 'Deck do Dia',
            trophies: 3450,
            winRate: '67%',
            usage: '2.5K',
            averageElixir: 3.8,
            cards: ['EG', 'TN', 'BR', 'MG', 'TS', 'ES', 'GL', 'FL'],
            cardNames: ['Electro Giant', 'Tornado', 'Bola Raios', 'Mago', 'Tesla', 'Esqueletos', 'Gelo', 'Flechas'],
            cardImages: [
                'https://clashroyale.com/images/cards/full/electrogiant.png',
                'https://clashroyale.com/images/cards/full/tornado.png',
                'https://clashroyale.com/images/cards/full/lightning.png',
                'https://clashroyale.com/images/cards/full/wizard.png',
                'https://clashroyale.com/images/cards/full/tesla.png',
                'https://clashroyale.com/images/cards/full/skeletons.png',
                'https://clashroyale.com/images/cards/full/icespirit.png',
                'https://clashroyale.com/images/cards/full/arrows.png'
            ]
        };

        setTimeout(() => {
            setLeaderDecks(mockLeaderDecks);
            setDeckOfTheDay(mockDeckOfTheDay);
            setLoading(false);
        }, 500);
    }, []);

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

    const renderDeckGrid = (cards, cardImages, cardNames) => {
        const deckCards = Array.isArray(cards) ? [...cards].slice(0, 8) : Array(8).fill('');
        const images = Array.isArray(cardImages) ? [...cardImages].slice(0, 8) : Array(8).fill(null);
        const names = Array.isArray(cardNames) ? [...cardNames].slice(0, 8) : Array(8).fill('Carta');
        
        for (let i = deckCards.length; i < 8; i++) {
            deckCards.push('');
            images.push(null);
            names.push(`Carta ${i + 1}`);
        }

        const rows = [deckCards.slice(0, 4), deckCards.slice(4, 8)];

        return (
            <div className="deck-grid-container">
                {rows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="deck-row">
                        {row.map((card, cardIndex) => {
                            const actualIndex = rowIndex * 4 + cardIndex;
                            const hasImage = images[actualIndex] && images[actualIndex] !== null;
                            const cardName = names[actualIndex] || `Carta ${actualIndex + 1}`;
                            
                            return (
                                <div key={`card-${rowIndex}-${cardIndex}`} className="card-box">
                                    {hasImage ? (
                                        <img
                                            src={images[actualIndex]}
                                            className="card-image-new"
                                            alt={cardName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/70x90/4B1664/FFFFFF?text=Carta';
                                                e.target.style.objectFit = 'cover';
                                            }}
                                        />
                                    ) : (
                                        <div className="card-placeholder">
                                            <FiHelpCircle className="help-icon" />
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

    if (loading) {
        return (
            <div className="loading-container">
                <div className="overlay" />
                <div className="loading-content">
                    <div className="spinner" />
                </div>
            </div>
        );
    }

    return (
        <div className="home-decker-container">
            <div className="home-decker-background-image">
                <div className="home-decker-overlay" />
                
                <h1 className="home-decker-title">Decks</h1>

                <div className="home-decker-main-content">
                    <div className="home-decker-columns-container">
                        <div className="home-decker-left-column">
                            <div className="home-decker-deck-section">
                                <div className="home-decker-section-header">
                                    <FiStar className="home-decker-section-icon" />
                                    <h2 className="home-decker-section-title">Deck Popular do Dia</h2>
                                </div>
                                
                                {deckOfTheDay && (
                                    <div className="home-decker-deck-card">
                                        <div className="home-decker-deck-header">
                                            <div className="home-decker-deck-header-left">
                                                <h3 className="home-decker-deck-name">{deckOfTheDay.name}</h3>
                                                <p className="home-decker-deck-player">{deckOfTheDay.player}</p>
                                            </div>
                                            <div className="home-decker-deck-stats">
                                                <div className="home-decker-stat-item">
                                                    <span className="home-decker-stat-icon">🏆</span>
                                                    <span className="home-decker-stat-value">{deckOfTheDay.trophies}</span>
                                                </div>
                                                <div className="home-decker-stat-item">
                                                    <span className="home-decker-stat-icon">📈</span>
                                                    <span className="home-decker-stat-value">{deckOfTheDay.winRate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="home-decker-deck-wrapper">
                                            <h3 className="home-decker-deck-title">Cartas do Deck:</h3>
                                            {renderDeckGrid(
                                                deckOfTheDay.cards, 
                                                deckOfTheDay.cardImages || [], 
                                                deckOfTheDay.cardNames || []
                                            )}
                                        </div>
                                        
                                        <div className="home-decker-deck-info">
                                            <div className="home-decker-info-item">
                                                <span className="home-decker-info-label">Custo Médio:</span>
                                                <span className="home-decker-info-value">{deckOfTheDay.averageElixir}⚡</span>
                                            </div>
                                            <div className="home-decker-info-item">
                                                <span className="home-decker-info-label">Usos Hoje:</span>
                                                <span className="home-decker-info-value">{deckOfTheDay.usage}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="home-decker-right-column">
                            <div className="home-decker-leaders-section">
                                <div className="home-decker-section-header">
                                    <FiTrendingUp className="home-decker-section-icon" />
                                    <h2 className="home-decker-section-title">Top 5 Leaders</h2>
                                </div>
                                
                                <div className="home-decker-carousel-container">
                                    <div className="home-decker-carousel-controls">
                                        <button onClick={prevLeader} className="home-decker-nav-button nav-button">
                                            <FiChevronLeft />
                                        </button>
                                        
                                        <div className="home-decker-carousel-counter">
                                            <span className="home-decker-counter-text">
                                                {currentLeaderIndex + 1} / {leaderDecks.length}
                                            </span>
                                        </div>
                                        
                                        <button onClick={nextLeader} className="home-decker-nav-button nav-button">
                                            <FiChevronRight />
                                        </button>
                                    </div>
                                    
                                    <div className="home-decker-leader-card">
                                        <div className="home-decker-leader-header">
                                            <div className="home-decker-leader-header-left">
                                                <h3 className="home-decker-leader-name">{currentLeader.name}</h3>
                                                <p className="home-decker-leader-player">{currentLeader.player}</p>
                                            </div>
                                            <div className="home-decker-trophy-badge">
                                                <span className="home-decker-trophy-icon">🏆</span>
                                                <span className="home-decker-trophy-value">{currentLeader.trophies}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="home-decker-deck-wrapper">
                                            <h3 className="home-decker-deck-title">Cartas do Deck:</h3>
                                            {renderDeckGrid(
                                                currentLeader.cards, 
                                                currentLeader.cardImages || [], 
                                                currentLeader.cardNames || []
                                            )}
                                        </div>
                                        
                                        <div className="home-decker-leader-stats">
                                            <div className="home-decker-leader-stat">
                                                <span className="home-decker-leader-stat-label">Taxa de Vitória</span>
                                                <span className="home-decker-leader-stat-value">{currentLeader.winRate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="home-decker-leader-indicators">
                                        {leaderDecks.map((deck, index) => (
                                            <div 
                                                key={deck.id}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
        'Electro Giant': 7, 'Mega Cavaleiro': 7, 'Bola de Fogo': 4, 'Gigante': 5,
        'Tesla': 4, 'Feiticeira Noturna': 4, 'Mega Minion': 3, 'Coletor': 5,
        'Lapidação': 3, 'Princesa': 3, 'Gangue Duendes': 2, 'Barril Duendes': 3,
        'Cavaleiro': 3, 'Rocha': 4, 'PEKKA': 7, 'Bandeira': 4, 'Bruxa': 5,
        'Poção': 4, 'E-Wiz': 4
    };
    return costs[cardName] || 4;
};

export default HomeDecker;