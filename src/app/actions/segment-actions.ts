"use server";

import { ai } from "@/lib/core/ai";
import { ensureAdmin } from "@/lib/core/auth-utils";

export async function generateSegmentPlaybook(segmentData: any) {
  await ensureAdmin();
  const prompt = `You are a niche market research analyst. Given this audience segment data: ${JSON.stringify(segmentData)}. 
  Generate a monetization playbook as JSON: 
  {
    "productOpportunities": [{"name": "...", "type": "...", "priceRange": "...", "fitScore": 0-100}],
    "contentStrategy": [{"platform": "...", "formatRecommendation": "...", "postingFrequency": "...", "contentPillars": ["..."]}],
    "partnershipOpportunities": ["brand names or org types"],
    "contrarian_insight": "one non-obvious observation about this segment that most marketers would miss"
  }`;

  try {
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4";
    const response = await ai.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content: "You are a senior market analyst specializing in hyper-niche audience segmentation. Return ONLY valid JSON."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Segment Playbook Error:", error);
    return { error: "Failed to generate market playbook." };
  }
}

export async function compareSegments(segmentIds: string[]) {
  // Logic to fetch and aggregate data for 2-3 segments
  return { success: true };
}