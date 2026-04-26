"use server";

import { generateInsight } from "@/lib/core/ai";
import { ai } from "@/lib/core/ai";

export async function analyzeOpportunity(data: any) {
  const prompt = `You are a digital business strategist specializing in domain valuation, niche product-market fit, and emerging tech trends. 
  Analyze this opportunity: ${JSON.stringify(data)}. 
  Return JSON with: executiveSummary, marketAnalysis (TAM, competition, barriers), monetizationStrategies (array of 3), riskFactors, actionPlan (array of prioritized next steps with estimated effort), and confidenceScore (0-100).`;

  try {
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4";
    const response = await ai.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are a senior digital strategist. Always return response in valid JSON format."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Opportunity Analysis Error:", error);
    return { error: "Failed to generate deep dive analysis." };
  }
}

export async function saveOpportunity(userId: string, opportunityData: any) {
  // Logic to save to DB (SavedOpportunity model)
  return { success: true };
}