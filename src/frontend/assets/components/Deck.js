import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Deck = ({ title }) => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await axios.get(`${API_URL}/decks/popular`);
        setDeck(res.data?.[0] || null);
      } catch (err) {
        console.error("Erro ao buscar deck popular:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px',
        color: 'white' 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p>Carregando deck...</p>
      </div>
    );
  }
  
  if (!deck) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.7)', 
        padding: '30px',
        fontStyle: 'italic' 
      }}>
        <p>Nenhum deck encontrado</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "rgba(255, 255, 255, 0.13)",
      padding: "20px",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      maxWidth: "800px",
      width: "90%",
      border: "1px solid rgba(238, 238, 238, 0.3)"
    }}>
      {title && (
        <h2 style={{ 
          fontSize: "22px", 
          color: "white", 
          marginBottom: "16px", 
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
        }}>
          {title}
        </h2>
      )}
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        gap: "12px",
        marginBottom: "16px" 
      }}>
        {deck.cards && deck.cards.map((card, idx) => (
          <img
            key={idx}
            src={card.icon}
            alt={`Carta ${idx + 1}`}
            style={{ 
              width: "55px", 
              height: "70px", 
              borderRadius: "8px", 
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/55x70/211951/ffffff?text=Card';
            }}
          />
        ))}
      </div>
      
      {deck.usage !== undefined && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          padding: "8px 16px",
          borderRadius: "20px",
          marginTop: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>🏆</span>
          <span style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>
            {deck.usage}% uso
          </span>
        </div>
      )}
    </div>
  );
};

export default Deck;