import React, { useRef, useState, useEffect } from "react";

const DeckCarousel = ({ title, decks = [], itemWidth = 300, spacing = 20 }) => {
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialOffset = (windowWidth - itemWidth) / 2;

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= decks.length) return;
    setIndex(newIndex);
    
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${newIndex * (itemWidth + spacing)}px)`;
      carouselRef.current.style.transition = 'transform 0.3s ease-out';
    }
  };

  const responsiveItemWidth = windowWidth < 768 ? 250 : itemWidth;
  const responsiveSpacing = windowWidth < 768 ? 15 : spacing;

  if (decks.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.7)', 
        padding: '40px',
        fontStyle: 'italic',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        margin: '20px'
      }}>
        <p>Nenhum deck disponível</p>
      </div>
    );
  }

  return (
    <div style={{ 
      margin: "30px 0", 
      width: "100%", 
      maxWidth: "1200px", 
      marginLeft: "auto", 
      marginRight: "auto", 
      padding: "0 20px" 
    }}>
      {title && (
        <h2 style={{ 
          fontSize: "24px", 
          color: "white", 
          marginBottom: "20px", 
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
        }}>
          {title}
        </h2>
      )}

      <div style={{ position: "relative" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px" 
        }}>
          {/* Botão anterior */}
          {decks.length > 1 && (
            <button 
              style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: index === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                transition: "all 0.3s ease",
                opacity: index === 0 ? 0.3 : 1,
                flexShrink: 0
              }}
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              ◀
            </button>
          )}

          {/* Área do carrossel */}
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div 
              ref={carouselRef}
              style={{ 
                display: "flex", 
                minWidth: "min-content",
                paddingLeft: `${initialOffset}px`
              }}
            >
              {decks.map((deck, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${responsiveItemWidth}px`,
                    marginRight: `${responsiveSpacing}px`,
                    backgroundColor: "rgba(255, 255, 255, 0.13)",
                    borderRadius: "15px",
                    padding: "16px",
                    border: "1px solid rgba(238, 238, 238, 0.3)",
                    flexShrink: 0
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    marginBottom: "12px" 
                  }}>
                    <span style={{ 
                      color: "gold", 
                      fontSize: "20px", 
                      fontWeight: "bold",
                      textShadow: "0 0 5px rgba(255, 215, 0, 0.5)"
                    }}>
                      #{deck.position || idx + 1}
                    </span>
                    <span style={{ 
                      color: "white", 
                      fontSize: "18px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {deck.name || `Deck ${idx + 1}`}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "center", 
                    gap: "6px" 
                  }}>
                    {deck.deck?.slice(0, 6).map((card, i) => (
                      <img
                        key={i}
                        src={card.icon}
                        alt={`Carta ${i + 1}`}
                        style={{ 
                          width: "45px", 
                          height: "60px", 
                          borderRadius: "6px", 
                          objectFit: "cover",
                          border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/55x70/211951/ffffff?text=Card';
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão próximo */}
          {decks.length > 1 && (
            <button 
              style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: index === decks.length - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                transition: "all 0.3s ease",
                opacity: index === decks.length - 1 ? 0.3 : 1,
                flexShrink: 0
              }}
              onClick={() => goTo(index + 1)}
              disabled={index === decks.length - 1}
            >
              ▶
            </button>
          )}
        </div>

        {/* Indicadores */}
        {decks.length > 1 && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "8px", 
            marginTop: "20px" 
          }}>
            {decks.map((_, idx) => (
              <button
                key={idx}
                style={{ 
                  width: "12px", 
                  height: "12px", 
                  borderRadius: "50%",
                  backgroundColor: idx === index ? "#4B1664" : "rgba(255, 255, 255, 0.3)",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  transform: idx === index ? "scale(1.3)" : "scale(1)",
                  transition: "all 0.3s ease"
                }}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckCarousel;