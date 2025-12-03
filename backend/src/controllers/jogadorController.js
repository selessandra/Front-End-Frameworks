import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const API_BASE_URL = "https://api.clashroyale.com/v1";
const TOKEN = process.env.API_KEY;

export const cadastrarJogador = async (req, res) => {
  try {
    const { idUsuario, clashId } = req.body;

    // === 1) Buscar dados na API ===
    const resp = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${clashId}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }
    );

    const { name, trophies, expLevel, countryCode } = resp.data;

    // === 2) Atualizar nome do Usuario ===
    await prisma.usuario.update({
      where: { id_usuario: idUsuario },
      data: { nome: name }
    });

    // === 3) Criar Jogador ===
    const jogador = await prisma.jogador.create({
      data: {
        clash_id: clashId,
        nome: name,
        nivel: expLevel,
        trofeus: trophies,
        pais: countryCode ?? null,
        id_usuario: idUsuario
      }
    });

    res.status(201).json(jogador);

  } catch (err) {
    if (err.response?.status === 404)
      return res.status(400).json({ error: "ID inválido ou jogador não encontrado" });

    console.log(err);
    res.status(500).json({ error: "Erro ao cadastrar jogador" });
  }
};

export const getMeuPerfil = async (req, res) => {
  try {
    const userId = req.userId; // do authMiddleware

    // 1) Buscar jogador do usuário (inclui clash_id)
    const jogador = await prisma.jogador.findUnique({
      where: { id_usuario: userId }
    });

    if (!jogador) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    // 2) Buscar dados atualizados na API do Clash Royale
    const resp = await axios.get(
      `${API_BASE_URL}/players/%23${jogador.clash_id}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }
    );

    const apiData = resp.data;

    // 3) Pegar currentDeck (array de cartas) — pode ser vazio
    // currentDeck structure: [{name, elixirCost, iconUrls: { medium: ... }}, ...]
    const currentDeck = Array.isArray(apiData.currentDeck) ? apiData.currentDeck : [];

    // 4) Formatar deck para o frontend (8 cartas esperadas)
    const formattedDeck = currentDeck.map(card => ({
      name: card.name,
      elixir: card.elixirCost ?? card.elixir ?? null,
      icon: card.iconUrls?.medium ?? card.icon ?? null
    }));

    // 5) Montar resposta
    return res.json({
      id_usuario: userId,
      clash_id: jogador.clash_id,
      nome: apiData.name,
      nivel: apiData.expLevel,
      trofeus: apiData.trophies,
      topTrofeus: apiData.bestTrophies,
      clanName: apiData.clan?.name || null,
      wins: apiData.wins ?? null,
      losses: apiData.losses ?? null,
      expLevel: apiData.expLevel,
      deck: formattedDeck // array de cartas
    });

  } catch (err) {
    console.log("Erro getMeuPerfil:", err.response?.data || err.message || err);
    return res.status(500).json({ error: "Erro ao buscar perfil" });
  }
};