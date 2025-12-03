import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/HomeDecker.css';
import { MdOutlineCollections, MdOutlineSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Deck from '../assets/components/Deck';  // Caminho corrigido
import DeckCarousel from '../assets/components/DeckCarousel';  // Caminho corrigido

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const HomeDecker = () => {
    const [leaderDecks, setLeaderDecks] = useState([]);
    const [loadingLeaders, setLoadingLeaders] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderDecks = async () => {
            try {
                const res = await axios.get(`${API_URL}/decks/leaders?limit=5`);
                setLeaderDecks(res.data || []);
            } catch (err) {
                console.error('Erro ao buscar decks dos líderes:', err.message);
            } finally {
                setLoadingLeaders(false);
            }
        };
        fetchLeaderDecks();
    }, []);

    return (
        
        <div className="home-decker-container">
            {/* Background com overlay */}
            <div className="background-overlay"></div>
            
            {/* Conteúdo principal com scroll */}
            <div className="content-scroll">
                {/* Deck Popular do Dia */}
                <Deck title="Deck Popular do Dia" />

                {/* Top 5 Leaders */}
                <div className="leaders-section">
                    <h2 className="section-title">Top 5 Leaders</h2>
                    {loadingLeaders ? (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                            <p>Carregando decks...</p>
                        </div>
                    ) : (
                        <DeckCarousel
                            title="Top 5 Leaders"
                            decks={leaderDecks} 
                            itemWidth={300}
                        />
                    )}
                </div>
                
                {/* Espaço para o menu inferior não cobrir conteúdo */}
                <div style={{ height: '100px' }}></div>
            </div>

            {/* Menu Inferior */}
            <div className="bottom-bar">
                <button 
                    className="nav-button active"
                    onClick={() => navigate('/home-decker')}
                >
                    <MdOutlineCollections className="nav-icon active-icon" />
                    <span className="nav-text">Decks</span>
                </button>

                <button 
                    className="nav-button"
                    onClick={() => navigate('/home-player')}
                >
                    <CgProfile className="nav-icon" />
                </button>

                <button 
                    className="nav-button"
                    onClick={() => navigate('/options')}
                >
                    <MdOutlineSettings className="nav-icon" />
                </button>
            </div>
        </div>
    );
};

export default HomeDecker;