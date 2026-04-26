"use server";

import { generateInsight } from "@/lib/core/ai";

export async function askOmniScale(prompt: string) {
  // In a real app, we might query the DB here first to get context
  // but for now, we'll just pass the prompt to the AI.
  const insight = await generateInsight(prompt);
  return insight;
}