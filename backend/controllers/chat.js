import OpenAI from "openai";

const client = new OpenAI();

export const getChat = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).json({
        error: "Invalid request: expected an array of messages",
      });
    }

    const isValidMessages = req.body.every(
      (msg) =>
        msg &&
        typeof msg.role === "string" &&
        typeof msg.content === "string"
    );

    if (!isValidMessages) {
      return res.status(400).json({
        error: "Invalid request: each message must have 'role' and 'content' strings",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      input: req.body,
    });

    res.status(200).json({
      role: "assistant",
      content: response.output_text,
    });
  } catch (error) {
    
    console.error("OpenAI API Error:", error);

    const statusCode = error.status || 500;

    res.status(statusCode).json({
      error:
        statusCode === 429
          ? "Rate limit exceeded. Please try again later."
          : statusCode === 401
          ? "Authentication error. Please contact support."
          : "Something went wrong. Please try again.",
    });
  }
};
