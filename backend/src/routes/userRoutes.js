import express from "express";
import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'API Backend'
  });
});

router.get("/", userController.getAllUsuarios);
router.post("/", userController.createUsuario);
router.put("/:id", userController.updateUsuario);

// DELETE correto (via token + senha)
router.post("/delete-with-password", authMiddleware, userController.deleteUsuario);

router.post("/login", userController.loginUsuario);

// Rota /me
router.get("/me", authMiddleware, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: req.userId },
  });
  res.json(usuario);
});

export default router;
