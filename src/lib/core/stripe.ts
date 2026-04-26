import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2026-04-22.dahlia" as any,
      typescript: true,
    });
  }
  return stripeInstance;
}

export const PLANS = [
  {
    name: "Basic",
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    price: 99,
    description: "Essential operations for small teams.",
    features: ["3 Core Modules", "10 Locations", "Basic CNS Ingestion", "Email Support"],
  },
  {
    name: "Professional",
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    price: 299,
    description: "Advanced intelligence for scaling businesses.",
    features: ["All 6 Modules", "Unlimited Locations", "AI Assistant", "Workflow Architect", "Priority Support"],
  },
  {
    name: "Enterprise",
    priceId: process.env.STRIPE_ENT_PRICE_ID,
    price: "Custom",
    description: "Full-scale global vertical integration.",
    features: ["Global Intel Hub", "Custom CNS Connectors", "Dedicated Instance", "SSO & RBAC", "24/7 Strategic Support"],
  },
];