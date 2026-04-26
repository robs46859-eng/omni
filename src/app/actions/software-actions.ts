"use server";

import { ai } from "@/lib/core/ai";
import { ensureAdmin } from "@/lib/core/auth-utils";

export async function generateSoftwareBrief(softwareData: any) {
  await ensureAdmin();
  const prompt = `You are a technical software analyst. Given this software's recent version history and sentiment data: ${JSON.stringify(softwareData)}. 
  Generate a briefing as JSON: 
  {
    "tldr": "2 sentences summarizing the update",
    "upgradeUrgency": "LOW/MEDIUM/HIGH/CRITICAL with reason",
    "breakingChangesImpact": "what breaks and who's affected",
    "communityConsensus": "summarize sentiment",
    "recommendation": "upgrade now / wait / skip with rationale"
  }`;

  try {
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4";
    const response = await ai.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are a senior technical architect and software analyst. Return ONLY valid JSON."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Software Brief Error:", error);
    return { error: "Failed to generate technical briefing." };
  }
}

export async function trackSoftware(userId: string, softwareId: string, notifyOn: string) {
  // Logic to add to UserTrackingList
  return { success: true };
}