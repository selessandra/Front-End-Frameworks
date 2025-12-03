import express from "express";
import { cadastrarJogador, getMeuPerfil } from "../controllers/jogadorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cadastrar", cadastrarJogador);

router.get("/me", authMiddleware, getMeuPerfil);

export default router;
