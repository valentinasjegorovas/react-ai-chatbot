import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../constants/prompts.js";

const client = new OpenAI();

export async function handleChatStream(socket, messages) {
  try {
    if (!messages || !Array.isArray(messages)) {
      socket.emit("chat:error", { message: "Invalid messages format" });
      return;
    }

    // Clean messages (remove id field, keep only role and content)
    const cleanedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add system prompt
    const messagesWithPrompt = [SYSTEM_PROMPT, ...cleanedMessages];

    socket.emit("chat:start");

    // Use OpenAI Responses API with streaming
    const stream = await client.responses.create({
      model: "gpt-4o-mini",
      input: messagesWithPrompt,
      stream: true,
    });

    let fullContent = "";

    // Process each event as it arrives
    for await (const event of stream) {
      // Handle different event types from Responses API
      if (event.type === "response.output_text.delta") {
        const content = event.delta;
        
        if (content) {
          fullContent += content;
          socket.emit("chat:token", { content });
        }
      }
    }

    socket.emit("chat:end", { 
      content: fullContent,
      role: "assistant" 
    });

  } catch (error) {
    console.error("Streaming error:", error);
    
    socket.emit("chat:error", {
      message: error.message || "Something went wrong",
    });
  }
}
