import React, { useState } from "react";
import "../assets/Homepg.css";

function Homepg() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredDecks = [
    { name: "Mega Knight Cycle", winRate: "67%", usage: "High" },
    { name: "Log Bait 2.9", winRate: "64%", usage: "Very High" },
    { name: "Golem Beatdown", winRate: "62%", usage: "Medium" },
    { name: "X-Bow 3.0", winRate: "59%", usage: "High" }
  ];

  const featuredPlayers = [
    { name: "Surgical Goblin", trophies: "8,432", clan: "Nova Esports" },
    { name: "Mortén", trophies: "8,321", clan: "SK Gaming" },
    { name: "Mohamed Light", trophies: "8,267", clan: "Team Queso" },
    { name: "Anaban", trophies: "8,198", clan: "Tribe Gaming" }
  ];

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredDecks.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredDecks.length) % featuredDecks.length);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Royale Deck Manager</h1>
          <p className="hero-subtitle">Analyze decks, find players, and improve your gameplay</p>
        </div>
      </div>

      <div className="home-content">
        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">🃏</div>
            <div className="stat-number">1,250+</div>
            <div className="stat-label">Decks Analyzed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Players Tracked</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-number">Real-time</div>
            <div className="stat-label">Updates</div>
          </div>
        </div>

        {/* Featured Deck */}
        <section className="featured-section">
          <h2 className="section-title">Featured Deck of the Day</h2>
          <div className="featured-carousel">
            <button className="carousel-btn prev" onClick={prevFeatured}>‹</button>
            
            <div className="featured-card">
              <div className="deck-header">
                <h3>{featuredDecks[featuredIndex].name}</h3>
                <span className="deck-badge">🔥 Hot</span>
              </div>
              <div className="deck-stats">
                <div className="stat">
                  <span className="stat-label">Win Rate:</span>
                  <span className="stat-value">{featuredDecks[featuredIndex].winRate}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Usage:</span>
                  <span className="stat-value">{featuredDecks[featuredIndex].usage}</span>
                </div>
              </div>
              <button className="view-deck-btn">View Deck Details</button>
            </div>
            
            <button className="carousel-btn next" onClick={nextFeatured}>›</button>
          </div>
        </section>

        {/* Top Players */}
        <section className="players-section">
          <h2 className="section-title">Top Players This Week</h2>
          <div className="players-grid">
            {featuredPlayers.map((player, index) => (
              <div key={index} className="player-card">
                <div className="player-rank">{index + 1}</div>
                <div className="player-avatar">👑</div>
                <div className="player-info">
                  <h4>{player.name}</h4>
                  <p>{player.trophies} trophies</p>
                  <span className="player-clan">{player.clan}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Sections */}
        <div className="cta-sections">
          <div className="cta-card decks-cta">
            <div className="cta-icon">🃏</div>
            <h3>Explore Decks</h3>
            <p>Browse and analyze the best decks from top players</p>
            <a href="/decks" className="cta-btn">View All Decks →</a>
          </div>
          
          <div className="cta-card finder-cta">
            <div className="cta-icon">🔍</div>
            <h3>Find Players</h3>
            <p>Search for players and analyze their performance</p>
            <a href="/player-finder" className="cta-btn">Find Players →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepg;