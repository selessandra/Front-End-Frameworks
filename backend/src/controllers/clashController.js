import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = "https://api.clashroyale.com/v1";
const TOKEN = process.env.API_KEY;

/* Busca informações de um jogador pelo tag */
export async function getPlayerInfo(req, res) {
  try {
    const { tag } = req.params;

    // Chamada à API (CR usa %23 no lugar de '#')
    const response = await axios.get(`${API_BASE_URL}/players/%23${tag}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar jogador:",
      error.response?.data || error.message
    );

    res.status(500).json({ error: "Erro ao buscar jogador" });
  }
}
