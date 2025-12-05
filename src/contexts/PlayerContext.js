import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../frontend/services/api";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    nome: '',
    clanName: '',
    trofeus: 0,
    topTrofeus: 0,
    wins: 0,
    losses: 0,
    expLevel: 1,
    deck: [],
    photo: null,
    id_usuario: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega dados do jogador da API
  const loadPlayerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get("/jogador/me");
      
      const userData = response.data;
      const savedPhoto = localStorage.getItem(`player_photo_${userData.id_usuario}`);

      const playerData = {
        nome: userData.nome || 'Jogador',
        clanName: userData.clanName || 'Sem clã',
        trofeus: userData.trofeus || 0,
        topTrofeus: userData.topTrofeus || 0,
        wins: userData.wins || 0,
        losses: userData.losses || 0,
        expLevel: userData.expLevel || 1,
        deck: userData.deck || [],
        photo: savedPhoto || userData.photo || null,
        id_usuario: userData.id_usuario
      };

      setPlayer(playerData);
      
      // Salva no localStorage para cache
      localStorage.setItem('clashhub_player', JSON.stringify(playerData));
      
    } catch (err) {
      console.error("Erro ao carregar dados do jogador:", err);
      setError(err.message || "Erro ao carregar dados");
      
      // Tenta carregar do cache
      const cached = localStorage.getItem('clashhub_player');
      if (cached) {
        setPlayer(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  // Atualiza foto do jogador
  const updatePhoto = async (photoUrl) => {
    try {
      const userId = player.id_usuario;
      if (!userId) return;

      // Atualiza localmente
      setPlayer(prev => ({ ...prev, photo: photoUrl }));
      
      // Salva no localStorage
      localStorage.setItem(`player_photo_${userId}`, photoUrl);
      
      // Atualiza cache
      const cached = JSON.parse(localStorage.getItem('clashhub_player') || '{}');
      cached.photo = photoUrl;
      localStorage.setItem('clashhub_player', JSON.stringify(cached));

      // Opcional: enviar para API se tiver endpoint
      // await api.patch("/jogador/photo", { photo: photoUrl });
      
    } catch (err) {
      console.error("Erro ao atualizar foto:", err);
    }
  };

  // Atualiza dados do jogador
  const updatePlayer = async (updates) => {
    try {
      const updatedPlayer = { ...player, ...updates };
      setPlayer(updatedPlayer);
      
      // Salva no cache
      localStorage.setItem('clashhub_player', JSON.stringify(updatedPlayer));
      
      // Envia para API se necessário
      // await api.patch("/jogador/update", updates);
      
      return true;
    } catch (err) {
      console.error("Erro ao atualizar jogador:", err);
      return false;
    }
  };

  // Carrega dados na inicialização
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadPlayerData();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    player,
    loading,
    error,
    loadPlayerData,
    updatePhoto,
    updatePlayer
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer deve ser usado dentro de PlayerProvider");
  }
  return context;
};