import express from "express";
import { getPlayerInfo } from "../controllers/clashController.js";

const router = express.Router();


router.get("/player/:tag", getPlayerInfo);

export default router;
