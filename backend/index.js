import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getChat } from "./controllers/chat.js";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/chat", getChat);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
