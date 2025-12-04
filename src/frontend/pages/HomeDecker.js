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

    // Função para renderizar a grade de cartas no formato HomePlayer
    const renderDeckGrid = (cards, cardImages, cardNames) => {
        // Garante que temos arrays válidos
        const deckCards = Array.isArray(cards) ? [...cards].slice(0, 8) : Array(8).fill('');
        const images = Array.isArray(cardImages) ? [...cardImages].slice(0, 8) : Array(8).fill(null);
        const names = Array.isArray(cardNames) ? [...cardNames].slice(0, 8) : Array(8).fill('Carta');
        
        // Preencher com placeholders se necessário
        for (let i = deckCards.length; i < 8; i++) {
            deckCards.push('');
            images.push(null);
            names.push(`Carta ${i + 1}`);
        }

        const rows = [deckCards.slice(0, 4), deckCards.slice(4, 8)];

        return (
            <div style={styles.deckGridContainer}>
                {rows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} style={styles.deckRow}>
                        {row.map((card, cardIndex) => {
                            const actualIndex = rowIndex * 4 + cardIndex;
                            const hasImage = images[actualIndex] && images[actualIndex] !== null;
                            const cardName = names[actualIndex] || `Carta ${actualIndex + 1}`;
                            
                            return (
                                <div key={`card-${rowIndex}-${cardIndex}`} style={styles.cardBox}>
                                    {hasImage ? (
                                        <img
                                            src={images[actualIndex]}
                                            style={styles.cardImageNew}
                                            alt={cardName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/70x90/4B1664/FFFFFF?text=Carta';
                                                e.target.style.objectFit = 'cover';
                                            }}
                                        />
                                    ) : (
                                        <div style={styles.cardPlaceholder}>
                                            <FiHelpCircle style={styles.helpIcon} />
                                        </div>
                                    )}
                                    <div style={styles.cardNameOverlay}>
                                        <span style={styles.cardNameText}>
                                            {cardName}
                                        </span>
                                        <span style={styles.cardElixirBadge}>
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
            <div style={styles.loadingContainer}>
                <div style={styles.overlay} />
                <div style={styles.loadingContent}>
                    <div style={styles.spinner} />
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.backgroundImage}>
                <div style={styles.overlay} />
                
                <h1 style={styles.title}>Decks</h1>

                <div style={styles.mainContent}>
                    <div style={styles.columnsContainer}>
                        {/* Coluna Esquerda - Deck do Dia */}
                        <div style={styles.leftColumn}>
                            <div style={styles.deckSection}>
                                <div style={styles.sectionHeader}>
                                    <FiStar style={styles.sectionIcon} />
                                    <h2 style={styles.sectionTitle}>Deck Popular do Dia</h2>
                                </div>
                                
                                {deckOfTheDay && (
                                    <div style={styles.deckCard}>
                                        <div style={styles.deckHeader}>
                                            <div style={styles.deckHeaderLeft}>
                                                <h3 style={styles.deckName}>{deckOfTheDay.name}</h3>
                                                <p style={styles.deckPlayer}>{deckOfTheDay.player}</p>
                                            </div>
                                            <div style={styles.deckStats}>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statIcon}>🏆</span>
                                                    <span style={styles.statValue}>{deckOfTheDay.trophies}</span>
                                                </div>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statIcon}>📈</span>
                                                    <span style={styles.statValue}>{deckOfTheDay.winRate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div style={styles.deckWrapper}>
                                            <h3 style={styles.deckTitle}>Cartas do Deck:</h3>
                                            {renderDeckGrid(
                                                deckOfTheDay.cards, 
                                                deckOfTheDay.cardImages || [], 
                                                deckOfTheDay.cardNames || []
                                            )}
                                        </div>
                                        
                                        <div style={styles.deckInfo}>
                                            <div style={styles.infoItem}>
                                                <span style={styles.infoLabel}>Custo Médio:</span>
                                                <span style={styles.infoValue}>{deckOfTheDay.averageElixir}⚡</span>
                                            </div>
                                            <div style={styles.infoItem}>
                                                <span style={styles.infoLabel}>Usos Hoje:</span>
                                                <span style={styles.infoValue}>{deckOfTheDay.usage}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Coluna Direita - Top Leaders Carrossel */}
                        <div style={styles.rightColumn}>
                            <div style={styles.leadersSection}>
                                <div style={styles.sectionHeader}>
                                    <FiTrendingUp style={styles.sectionIcon} />
                                    <h2 style={styles.sectionTitle}>Top 5 Leaders</h2>
                                </div>
                                
                                <div style={styles.carouselContainer}>
                                    <div style={styles.carouselControls}>
                                        <button onClick={prevLeader} style={styles.navButton}>
                                            <FiChevronLeft />
                                        </button>
                                        
                                        <div style={styles.carouselCounter}>
                                            <span style={styles.counterText}>
                                                {currentLeaderIndex + 1} / {leaderDecks.length}
                                            </span>
                                        </div>
                                        
                                        <button onClick={nextLeader} style={styles.navButton}>
                                            <FiChevronRight />
                                        </button>
                                    </div>
                                    
                                    <div style={styles.leaderCard}>
                                        <div style={styles.leaderHeader}>
                                            <div style={styles.leaderHeaderLeft}>
                                                <h3 style={styles.leaderName}>{currentLeader.name}</h3>
                                                <p style={styles.leaderPlayer}>{currentLeader.player}</p>
                                            </div>
                                            <div style={styles.trophyBadge}>
                                                <span style={styles.trophyIcon}>🏆</span>
                                                <span style={styles.trophyValue}>{currentLeader.trophies}</span>
                                            </div>
                                        </div>
                                        
                                        <div style={styles.deckWrapper}>
                                            <h3 style={styles.deckTitle}>Cartas do Deck:</h3>
                                            {renderDeckGrid(
                                                currentLeader.cards, 
                                                currentLeader.cardImages || [], 
                                                currentLeader.cardNames || []
                                            )}
                                        </div>
                                        
                                        <div style={styles.leaderStats}>
                                            <div style={styles.leaderStat}>
                                                <span style={styles.leaderStatLabel}>Taxa de Vitória</span>
                                                <span style={styles.leaderStatValue}>{currentLeader.winRate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={styles.leaderIndicators}>
                                        {leaderDecks.map((deck, index) => (
                                            <div 
                                                key={deck.id}
                                                onClick={() => setCurrentLeaderIndex(index)}
                                                style={{
                                                    ...styles.indicatorItem,
                                                    borderColor: index === currentLeaderIndex ? '#ffd700' : 'transparent'
                                                }}
                                            >
                                                <div style={styles.indicatorContent}>
                                                    <span style={styles.indicatorName}>{deck.name}</span>
                                                    <span style={styles.indicatorTrophy}>🏆 {deck.trophies}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer style={styles.bottomBar}>
                    <button 
                        onClick={() => navigate('/HomeDecker')}
                        style={styles.activeNavButton}
                    >
                        <FiGrid style={styles.activeIcon} />
                        <span style={styles.activeLabel}>Decks</span>
                    </button>

                    <button 
                        onClick={() => navigate('/HomePlayer')}
                        style={styles.navButtonFooter}
                    >
                        <FiUser style={styles.navIcon} />
                        <span style={styles.navLabel}>Player</span>
                    </button>

                    <button 
                        onClick={() => navigate('/HomeOptions')}
                        style={styles.navButtonFooter}
                    >
                        <FiSettings style={styles.navIcon} />
                        <span style={styles.navLabel}>Opções</span>
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

const styles = {
    container: {
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundImage: {
        flex: 1,
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
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
        background: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        position: 'relative',
        color: 'white',
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        margin: 0,
        zIndex: 1,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    mainContent: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '80px',
        zIndex: 1,
    },
    columnsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 1.5rem)',
        gap: 'clamp(1rem, 3vw, 2rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        minHeight: 0,
    },
    leftColumn: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    rightColumn: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    deckSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    leadersSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
        marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
    },
    sectionIcon: {
        color: '#ffd700',
        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        flexShrink: 0,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)',
        fontWeight: 'bold',
        margin: 0,
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    deckCard: {
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 'clamp(1rem, 2vw, 1.25rem)',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
    },
    deckHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    deckHeaderLeft: {
        flex: 1,
        minWidth: '200px',
    },
    deckName: {
        color: 'white',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.2,
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    deckPlayer: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        margin: 0,
    },
    deckStats: {
        display: 'flex',
        flexDirection: 'row',
        gap: 'clamp(0.75rem, 1.5vw, 1rem)',
        alignItems: 'center',
        flexShrink: 0,
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '0.75rem',
    },
    statIcon: {
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    },
    statValue: {
        color: '#ffd700',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: 'bold',
    },
    // DECK WRAPPER - ESTILOS DO HOMEPLAYER
    deckWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '15px',
        padding: '15px',
        width: '100%',
        marginTop: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '300px',
    },
    deckTitle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: '15px',
        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
        fontWeight: 'bold',
    },
    deckGridContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
        justifyContent: 'center',
    },
    deckRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
    },
    cardBox: {
        width: '75px',
        height: '95px',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: '8px',
        border: '2px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        position: 'relative',
    },
    cardImageNew: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        padding: '5px',
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
        width: '30px',
        height: '30px',
        color: '#aaa',
    },
    cardNameOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '3px 5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardNameText: {
        color: 'white',
        fontSize: '9px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
    },
    cardElixirBadge: {
        color: '#00ff88',
        fontSize: '8px',
        fontWeight: 'bold',
        marginLeft: '5px',
        flexShrink: 0,
    },
    deckInfo: {
        background: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 'clamp(0.75rem, 1.5vw, 1rem)',
        padding: 'clamp(0.75rem, 1.5vw, 1rem)',
        marginTop: 'auto',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    infoLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    },
    infoValue: {
        color: '#ffd700',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: 'bold',
    },
    carouselContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2vw, 1.25rem)',
        minHeight: 0,
    },
    carouselControls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.75rem, 1.5vw, 1rem)',
    },
    navButton: {
        background: 'rgba(255, 255, 255, 0.15)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        width: 'clamp(2.5rem, 5vw, 3rem)',
        height: 'clamp(2.5rem, 5vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        flexShrink: 0,
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        transition: 'all 0.2s',
    },
    carouselCounter: {
        color: 'white',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: '600',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '0.5rem 1rem',
        borderRadius: '1.25rem',
        minWidth: '5rem',
        textAlign: 'center',
    },
    counterText: {
        color: '#ffd700',
    },
    leaderCard: {
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 'clamp(1rem, 2vw, 1.25rem)',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
    },
    leaderHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    leaderHeaderLeft: {
        flex: 1,
        minWidth: '200px',
    },
    leaderName: {
        color: 'white',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.2,
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    leaderPlayer: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        margin: 0,
    },
    trophyBadge: {
        background: 'rgba(255, 215, 0, 0.2)',
        borderRadius: 'clamp(1rem, 2vw, 1.25rem)',
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)',
        border: '2px solid rgba(255, 215, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
        flexShrink: 0,
    },
    trophyIcon: {
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    },
    trophyValue: {
        color: '#ffd700',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: 'bold',
    },
    leaderStats: {
        background: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 'clamp(0.75rem, 1.5vw, 1rem)',
        padding: 'clamp(0.75rem, 1.5vw, 1rem)',
        marginTop: 'auto',
    },
    leaderStat: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leaderStatLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    },
    leaderStatValue: {
        color: '#ffd700',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: 'bold',
    },
    leaderIndicators: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.5rem, 1vw, 0.625rem)',
        maxHeight: '150px',
        overflowY: 'auto',
        paddingRight: '0.3125rem',
        minHeight: 0,
    },
    indicatorItem: {
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 'clamp(0.5rem, 1vw, 0.75rem)',
        padding: 'clamp(0.75rem, 1.5vw, 1rem)',
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all 0.2s',
    },
    indicatorContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indicatorName: {
        color: 'white',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        fontWeight: '500',
        flex: 1,
        marginRight: '0.625rem',
    },
    indicatorTrophy: {
        color: '#ffd700',
        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
        fontWeight: '600',
        flexShrink: 0,
    },
    bottomBar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.25)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: 'clamp(0.75rem, 2vw, 1rem) 0',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        height: '80px',
        boxSizing: 'border-box',
    },
    activeNavButton: {
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#4B1664',
        border: 'none',
        borderRadius: 'clamp(0.75rem, 1.5vw, 1rem)',
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(0.25rem, 0.75vw, 0.5rem)',
        cursor: 'pointer',
        minWidth: 'clamp(4rem, 8vw, 5rem)',
        transition: 'all 0.2s',
        height: '60px',
    },
    navButtonFooter: {
        background: 'transparent',
        color: 'rgba(255, 255, 255, 0.8)',
        border: 'none',
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(0.25rem, 0.75vw, 0.5rem)',
        cursor: 'pointer',
        minWidth: 'clamp(4rem, 8vw, 5rem)',
        transition: 'all 0.2s',
        height: '60px',
    },
    activeIcon: {
        color: '#4B1664',
        fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
    },
    navIcon: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
    },
    activeLabel: {
        color: '#4B1664',
        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
        fontWeight: 'bold',
    },
    navLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    },
    loadingContainer: {
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    loadingContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    spinner: {
        width: 'clamp(2.5rem, 5vw, 3.125rem)',
        height: 'clamp(2.5rem, 5vw, 3.125rem)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid #ffd700',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        * {
            box-sizing: border-box;
        }
        
        html {
            font-size: 16px;
        }
        
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        button {
            transition: all 0.2s ease;
            outline: none;
            font-family: inherit;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .navButton:hover {
            background-color: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        .cardBox:hover {
            transform: translateY(-3px);
            border-color: #ffd700;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .indicatorItem:hover {
            background-color: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        .activeNavButton:hover {
            background-color: rgba(255, 255, 255, 0.25);
        }
        
        .navButtonFooter:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
            .columnsContainer {
                gap: 1.5rem;
            }
        }
        
        @media (max-width: 992px) {
            .columnsContainer {
                flex-direction: column;
                gap: 2rem;
            }
            
            .leftColumn,
            .rightColumn {
                width: 100%;
            }
            
            .mainContent {
                padding-bottom: 70px;
            }
            
            .bottomBar {
                height: 70px;
            }
            
            .activeNavButton,
            .navButtonFooter {
                height: 55px;
            }
        }
        
        @media (max-width: 768px) {
            .deckHeader,
            .leaderHeader {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.75rem;
            }
            
            .deckStats {
                width: 100%;
                justify-content: flex-start;
            }
            
            .deckTitle {
                font-size: 1rem;
            }
            
            .cardBox {
                width: 65px;
                height: 85px;
            }
            
            .mainContent {
                padding-bottom: 65px;
            }
            
            .bottomBar {
                height: 65px;
            }
        }
        
        @media (max-width: 576px) {
            .title {
                font-size: 1.5rem;
            }
            
            .sectionTitle {
                font-size: 1.2rem;
            }
            
            .deckName,
            .leaderName {
                font-size: 1.2rem;
            }
            
            .cardBox {
                width: 58px;
                height: 78px;
            }
            
            .cardNameText {
                font-size: 8px;
            }
            
            .cardElixirBadge {
                font-size: 7px;
            }
            
            .deckRow {
                gap: 6px;
            }
            
            .carouselControls {
                gap: 0.5rem;
            }
            
            .navButton {
                width: 2.25rem;
                height: 2.25rem;
                font-size: 1rem;
            }
            
            .carouselCounter {
                min-width: 4rem;
                font-size: 0.875rem;
            }
            
            .mainContent {
                padding-bottom: 60px;
            }
            
            .bottomBar {
                height: 60px;
                padding: 0.5rem 0;
            }
            
            .activeNavButton,
            .navButtonFooter {
                padding: 0.375rem 0.75rem;
                min-width: 3.5rem;
                height: 50px;
            }
            
            .activeIcon,
            .navIcon {
                font-size: 1.1rem;
            }
            
            .activeLabel,
            .navLabel {
                font-size: 0.7rem;
            }
        }
        
        @media (max-width: 400px) {
            .columnsContainer {
                padding-left: 0.75rem;
                padding-right: 0.75rem;
            }
            
            .deckCard,
            .leaderCard {
                padding: 0.875rem;
            }
            
            .statItem {
                padding: 0.375rem 0.5rem;
            }
            
            .infoItem,
            .leaderStat {
                font-size: 0.875rem;
            }
            
            .leaderIndicators {
                max-height: 120px;
            }
            
            .cardBox {
                width: 52px;
                height: 72px;
            }
            
            .mainContent {
                padding-bottom: 55px;
            }
            
            .bottomBar {
                height: 55px;
            }
            
            .activeNavButton,
            .navButtonFooter {
                padding: 0.25rem 0.5rem;
                min-width: 3rem;
                height: 45px;
            }
        }
        
        @media (max-width: 350px) {
            .deckRow {
                gap: 4px;
            }
            
            .cardBox {
                width: 48px;
                height: 68px;
            }
            
            .cardNameOverlay {
                padding: 2px 3px;
            }
            
            .cardNameText {
                font-size: 7px;
            }
            
            .cardElixirBadge {
                font-size: 6px;
            }
            
            .homeContainer {
                padding: 5px 12px 80px 12px;
            }
        }
        
        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .deckCard,
            .leaderCard {
                border-width: 0.5px;
            }
            
            .cardBox {
                border-width: 1px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .deckCard,
            .leaderCard {
                background: rgba(0, 0, 0, 0.4);
            }
            
            .deckWrapper {
                background: rgba(0, 0, 0, 0.3);
            }
            
            .cardBox {
                background: rgba(255, 255, 255, 0.1);
            }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            button:hover,
            .cardBox:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

export default HomeDecker;