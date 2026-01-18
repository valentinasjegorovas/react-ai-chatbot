import { getChatResponse } from "../services/openai.service.js";


export async function getChat(req, res, next) {
  try {
    const messages = req.body;

   
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid request: expected an array of messages",
      });
    }

    const isValid = messages.every(
      (msg) =>
        msg &&
        typeof msg.role === "string" &&
        typeof msg.content === "string"
    );

    if (!isValid) {
      return res.status(400).json({
        error: "Invalid request: each message must have 'role' and 'content'",
      });
    }

    const responseText = await getChatResponse(messages);

    res.status(200).json({
      role: "assistant",
      content: responseText,
    });
  } catch (error) {
    next(error);
  }
}
