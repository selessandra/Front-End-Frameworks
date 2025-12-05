import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DeckCarousel = ({ 
  title, 
  decks = [], 
  autoPlay = true,
  interval = 5000,
  showIndicators = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isAutoPlaying || decks.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === decks.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, decks.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play on manual navigation
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide(currentIndex === decks.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? decks.length - 1 : currentIndex - 1);
  };

  const renderCard = (card, index) => {
    if (!card?.icon) {
      return (
        <div key={index} className="carousel-card-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-text">?</span>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="carousel-card">
        <img
          src={card.icon}
          alt={card.name || `Carta ${index + 1}`}
          className="carousel-card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/50x65/4B1664/FFFFFF?text=Carta';
          }}
        />
        {card.name && (
          <div className="carousel-card-name">
            {card.name}
          </div>
        )}
      </div>
    );
  };

  if (decks.length === 0) {
    return (
      <div className="carousel-empty">
        <p>Nenhum deck disponível</p>
      </div>
    );
  }

  const currentDeck = decks[currentIndex];

  return (
    <div 
      className="deck-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {title && (
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
          <div className="carousel-counter">
            <span className="counter-text">
              {currentIndex + 1} / {decks.length}
            </span>
          </div>
        </div>
      )}

      <div className="carousel-content">
        <div className="carousel-navigation">
          <button 
            onClick={prevSlide} 
            className="carousel-button prev-button"
            disabled={decks.length <= 1}
          >
            <FiChevronLeft />
          </button>

          <div className="carousel-slide">
            <div className="slide-header">
              <h3 className="slide-deck-name">
                #{currentDeck.position || currentIndex + 1} {currentDeck.name}
              </h3>
              <p className="slide-player">{currentDeck.player}</p>
            </div>

            <div className="slide-stats">
              {currentDeck.trophies !== undefined && (
                <div className="slide-stat">
                  <span className="stat-icon">🏆</span>
                  <span className="stat-value">{currentDeck.trophies}</span>
                </div>
              )}
              
              {currentDeck.winRate !== undefined && (
                <div className="slide-stat">
                  <span className="stat-icon">📈</span>
                  <span className="stat-value">{currentDeck.winRate}</span>
                </div>
              )}
            </div>

            <div className="slide-deck">
              <h4 className="deck-cards-title">Cartas do Deck</h4>
              <div className="deck-cards-grid">
                {(currentDeck.deck || []).map(renderCard)}
              </div>
            </div>
          </div>

          <button 
            onClick={nextSlide} 
            className="carousel-button next-button"
            disabled={decks.length <= 1}
          >
            <FiChevronRight />
          </button>
        </div>

        {showIndicators && decks.length > 1 && (
          <div className="carousel-indicators">
            {decks.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckCarousel;