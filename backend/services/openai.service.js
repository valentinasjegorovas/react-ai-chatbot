import OpenAI from "openai";

const client = new OpenAI();

export async function getChatResponse(messages) {
  const response = await client.responses.create({
    model: "gpt-5",
    input: messages,
  });

  return response.output_text;
}
