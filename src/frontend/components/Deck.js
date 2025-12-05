import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Deck = ({ title, deckId }) => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/decks/popular');
        const deckData = response.data?.[0] || null;
        
        if (deckData) {
          setDeck(deckData);
        } else {
          setError('Nenhum deck popular encontrado');
        }
        
      } catch (err) {
        console.error('Erro ao buscar deck:', err);
        setError('Não foi possível carregar o deck');
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const renderCards = () => {
    if (!deck?.deck || deck.deck.length === 0) {
      return <p className="no-cards-message">Nenhuma carta disponível</p>;
    }

    return (
      <div className="deck-cards-grid">
        {deck.deck.map((card, index) => (
          <div key={index} className="deck-card-item">
            {card.icon ? (
              <img
                src={card.icon}
                alt={card.name || `Carta ${index + 1}`}
                className="deck-card-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/60x75/4B1664/FFFFFF?text=Carta';
                }}
              />
            ) : (
              <div className="deck-card-placeholder">
                <span className="placeholder-text">?</span>
              </div>
            )}
            <div className="deck-card-info">
              <span className="card-name">{card.name || `Carta ${index + 1}`}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="deck-loading">
        <div className="loading-spinner"></div>
        <p>Carregando deck...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="deck-error">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="deck-empty">
        <p>Nenhum deck disponível</p>
      </div>
    );
  }

  return (
    <div className="deck-container">
      {title && (
        <h2 className="deck-title">{title}</h2>
      )}
      
      <div className="deck-content">
        <div className="deck-header">
          <h3 className="deck-name">{deck.name || 'Deck Popular'}</h3>
          <p className="deck-player">{deck.player || 'Jogador'}</p>
        </div>
        
        <div className="deck-stats">
          {deck.trophies !== undefined && (
            <div className="deck-stat">
              <span className="stat-icon">🏆</span>
              <span className="stat-value">{deck.trophies}</span>
            </div>
          )}
          
          {deck.winRate !== undefined && (
            <div className="deck-stat">
              <span className="stat-icon">📈</span>
              <span className="stat-value">{deck.winRate}%</span>
            </div>
          )}
          
          {deck.usage !== undefined && (
            <div className="deck-stat">
              <span className="stat-icon">👥</span>
              <span className="stat-value">{deck.usage}% uso</span>
            </div>
          )}
        </div>
        
        <div className="deck-cards-container">
          <h4 className="cards-title">Cartas do Deck</h4>
          {renderCards()}
        </div>
        
        {deck.averageElixir !== undefined && (
          <div className="deck-footer">
            <span className="elixir-cost">
              Custo médio: <strong>{deck.averageElixir} ⚡</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deck;