"use server";

import { generateInsight } from "@/lib/core/ai";
import { ensureAdmin } from "@/lib/core/auth-utils";

export async function askOmniScale(prompt: string) {
  await ensureAdmin();
  const insight = await generateInsight(prompt);
  return insight;
}