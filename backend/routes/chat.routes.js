import { Router } from "express";
import { getChat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", getChat);

export default router;
