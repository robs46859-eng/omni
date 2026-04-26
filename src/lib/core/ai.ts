import OpenAI from "openai";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const apiKey = process.env.AZURE_OPENAI_API_KEY || "";
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4";

export const ai = new OpenAI({
  apiKey: apiKey,
  baseURL: `${endpoint}/openai/deployments/${deployment}`,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": apiKey },
});

export async function generateInsight(prompt: string) {
  try {
    const response = await ai.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are OmniScale AI, a senior business analyst. Provide concise, data-driven insights based on the user query."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "I'm sorry, I couldn't generate an insight at this moment. Please check the system logs.";
  }
}