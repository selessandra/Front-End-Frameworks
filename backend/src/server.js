import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import clashRoutes from "./routes/clashRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jogadorRoutes from "./routes/jogadorRoutes.js";
import resetRoutes from "./routes/resetRoutes.js";
import deckRoutes from "./routes/decks.js";


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.use("/clash", clashRoutes);
app.use("/usuarios", userRoutes);
app.use("/jogador", jogadorRoutes);
app.use("/decks", deckRoutes);

// rotas de redefinir senha
app.use("/reset", resetRoutes);


const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));