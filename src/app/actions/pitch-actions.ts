"use server";

import { ai } from "@/lib/core/ai";

export async function generatePitch(data: any) {
  const prompt = `You are an elite automation sales consultant. Generate a pitch for ${data.role} at a ${data.companySize} company in ${data.industry}. 
  Their pain points: ${JSON.stringify(data.painPoints)}. Tone: ${data.tone}. Format: ${data.format}. 
  Return JSON with: 
  {
    "headline": "...",
    "openingHook": "...",
    "painPointAcknowledgment": "...",
    "solutionFramework": [{"processName": "...", "currentState": "...", "automatedState": "...", "timeSavingsPerWeek": "...", "costSavingsPerMonth": "...", "implementationComplexity": "LOW/MED/HIGH"}],
    "roiSummary": {"totalTimeSaved": "...", "totalCostSaved": "...", "paybackPeriod": "..."},
    "callToAction": "...",
    "objectionHandlers": [{"objection": "...", "response": "..."}]
  }`;

  try {
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4";
    const response = await ai.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are a senior automation strategist. Return ONLY valid JSON."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Pitch Generation Error:", error);
    return { error: "Failed to generate automation pitch." };
  }
}

export async function refinePitch(pitchId: string, instruction: string) {
  // Logic to refine existing pitch using history
  return { success: true };
}