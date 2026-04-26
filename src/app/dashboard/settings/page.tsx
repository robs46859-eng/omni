"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  Users, 
  Shield, 
  Key, 
  Bell, 
  Check,
  Zap,
  Globe,
  Lock,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/lib/core/stripe";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & Administration</h1>
        <p className="text-muted-foreground mt-1">Manage your platform profile, team, and enterprise subscriptions.</p>
      </div>

      <Tabs defaultValue="billing" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 h-11 w-full justify-start space-x-2 border-b rounded-none bg-transparent">
          <TabsTrigger value="profile" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
            <CreditCard className="mr-2 h-4 w-4" /> Billing & Tiers
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
            <Users className="mr-2 h-4 w-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
            <Key className="mr-2 h-4 w-4" /> API & Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="billing" className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Subscription Plans</h2>
              <p className="text-sm text-muted-foreground">Select the tier that fits your operational scale.</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none">
              Current Plan: Free Trial
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Card key={plan.name} className={cn(
                "relative overflow-hidden flex flex-col",
                plan.name === "Professional" ? "border-primary shadow-xl scale-105 z-10" : "bg-card"
              )}>
                {plan.name === "Professional" && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest px-3">Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                    </span>
                    {typeof plan.price === "number" && <span className="text-muted-foreground ml-1">/mo</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <Check className="mr-2 h-4 w-4 text-emerald-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button 
                    className="w-full shadow-md" 
                    variant={plan.name === "Professional" ? "default" : "outline"}
                    disabled={loadingPlan === plan.name}
                    onClick={() => setLoadingPlan(plan.name)}
                  >
                    {loadingPlan === plan.name ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Upgrade to {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-500" />
              One-Time Charges & Upsells
            </h3>
            <Card className="border-purple-200 bg-purple-50/30 dark:bg-purple-950/10">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md text-purple-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Landing Page Builder Creative License</p>
                    <p className="text-xs text-muted-foreground italic">Instant HTML distillment powered by FullStack AI.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold">$19.00</span>
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 h-8">Remove</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-dashed">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-muted rounded-full text-muted-foreground">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Enterprise Security</h3>
                  <p className="text-sm text-muted-foreground italic">Custom billing and tax handling available for global organizations.</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Contact Compliance</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your personal information and account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="System Administrator" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue="admin@omniscale.ai" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Platform Role</Label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary shadow-sm px-3">ADMIN</Badge>
                  <span className="text-xs text-muted-foreground italic">Role managed by organization owner.</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 p-4">
              <Button size="sm">Save Profile Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Integrate OmniScale with your existing toolchain via secure API keys.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Production Key</span>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-background p-2 rounded border text-xs overflow-x-auto">om_live_4920_xxxxxxxxxxxxxxxxxxxxxx</code>
                  <Button variant="outline" size="sm">Rotate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Webhook Endpoint</h4>
                <div className="flex items-center space-x-2">
                  <Input defaultValue="https://api.omniscale.ai/v1/webhook" readOnly />
                  <Button variant="outline" size="sm">Test</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}