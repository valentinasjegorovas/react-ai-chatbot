import { getChatResponse } from "../services/openai.service.js";
import { SYSTEM_PROMPT } from "../constants/prompts.js";

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

    // Strip out 'id' and any extra fields - OpenAI only accepts 'role' and 'content'
    const cleanedMessages = messages.map(({ role, content }) => ({ role, content }));

    const messagesWithPrompt = [SYSTEM_PROMPT, ...cleanedMessages];

    const responseText = await getChatResponse(messagesWithPrompt);

    res.status(200).json({
      role: "assistant",
      content: responseText,
    });
  } catch (error) {
    next(error);
  }
}
