"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Zap, 
  Settings2, 
  FileText, 
  Sparkles,
  Search,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const industries = [
  "Healthcare", "Logistics", "Real Estate", "Legal", "E-commerce", 
  "Manufacturing", "Construction", "Education", "FinTech", "AgTech"
];

const painPoints = [
  "Manual data entry errors",
  "Slow client onboarding",
  "Invoice processing delays",
  "High employee turnover",
  "Poor lead response times",
  "Compliance tracking overhead",
  "Inventory stock-out issues",
  "Inefficient route planning"
];

export default function PitchGeneratorPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate Automation Pitch</h1>
          <p className="text-muted-foreground mt-1">Guided wizard for creating elite-level sales guides.</p>
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={cn(
              "h-1.5 w-8 rounded-full transition-all duration-300",
              s === step ? "bg-primary w-12" : s < step ? "bg-primary/40" : "bg-muted"
            )} />
          ))}
        </div>
      </div>

      <Card className="shadow-xl border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex items-center space-x-2 text-primary mb-2">
            {step === 1 && <Target className="h-5 w-5" />}
            {step === 2 && <AlertCircle className="h-5 w-5 text-amber-500" />}
            {step === 3 && <Settings2 className="h-5 w-5 text-blue-500" />}
            {step === 4 && <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />}
            <span className="text-xs font-bold uppercase tracking-widest">
              Step {step} of 4: {
                step === 1 ? "Target Profile" : 
                step === 2 ? "Pain Point Identification" : 
                step === 3 ? "Tone & Formatting" : "Finalize & Generate"
              }
            </span>
          </div>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Search or select industry..." />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(i => <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Role/Title</Label>
                  <Input placeholder="e.g. VP of Operations, Medical Director..." />
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employees count..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1 - 10 Employees</SelectItem>
                      <SelectItem value="11-50">11 - 50 Employees</SelectItem>
                      <SelectItem value="51-200">51 - 200 Employees</SelectItem>
                      <SelectItem value="201-1000">201 - 1000 Employees</SelectItem>
                      <SelectItem value="1000+">1000+ Employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <p className="text-sm text-muted-foreground italic mb-4 border-l-2 pl-4 border-primary/20">
                AI Tip: Based on the Healthcare industry, "Clinical onboarding" and "Insurance verification" are typically the highest ROI targets.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {painPoints.map((p) => (
                  <div key={p} className="flex items-center space-x-2 border p-3 rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors group">
                    <div className="h-4 w-4 rounded border border-muted-foreground group-hover:border-primary" />
                    <span className="text-xs font-medium">{p}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary mt-4">
                <Plus className="mr-1 h-3 w-3" /> Add Custom Pain Point
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>Pitch Tone</Label>
                  <div className="grid gap-2">
                    {["Consultative", "Professional", "Bold", "Friendly"].map(t => (
                      <Button key={t} variant="outline" className="justify-start h-10 text-xs hover:border-primary">
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Output Format</Label>
                  <div className="grid gap-2">
                    {["Email Sequence", "One-Pager", "Slide Deck Outline", "Script"].map(f => (
                      <Button key={f} variant="outline" className="justify-start h-10 text-xs hover:border-primary">
                        {f}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                  <div className="space-y-1">
                    <p className="font-bold">Generating Elite Pitch...</p>
                    <p className="text-xs text-muted-foreground">Calculating ROI and acknowledging industry pain points.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 max-w-md">
                  <div className="mx-auto bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Ready for Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      Our Elite Sales AI is ready to synthesize your data into a high-conversion automation guide.
                    </p>
                  </div>
                  <div className="pt-4 border-t w-full flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                    <span>Precision: High</span>
                    <span>Format: Email</span>
                    <span>Industry: Healthcare</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 border-t p-4 flex justify-between">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1 || isGenerating}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {step < 4 ? (
            <Button onClick={nextStep} className="shadow-md">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setIsGenerating(true)} disabled={isGenerating} className="bg-primary hover:bg-primary/90 shadow-lg px-8">
              {isGenerating ? "Analyzing..." : "Generate Pitch"}
              {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}