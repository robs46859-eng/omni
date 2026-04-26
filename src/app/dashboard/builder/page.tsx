"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Monitor, 
  Download, 
  ExternalLink, 
  Zap, 
  AlertTriangle,
  Code2,
  Undo2,
  Layers,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPageBuilder() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI delay for now
    setTimeout(() => {
      setGeneratedHtml(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Generated Landing Page</title>
        </head>
        <body class="bg-slate-50 flex items-center justify-center min-h-screen font-sans">
          <div class="max-w-xl p-8 bg-white shadow-2xl rounded-2xl text-center space-y-6">
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">${prompt}</h1>
            <p class="text-lg text-slate-600">Your AI-generated landing page prototype is ready for distribution.</p>
            <button class="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">Get Started Now</button>
          </div>
        </body>
        </html>
      `);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            Instant Landing Page Builder
            <Badge className="ml-3 bg-purple-500 text-white border-none uppercase text-[10px]">Upgrade Perk</Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate production-ready single-page HTML sites from a single descriptive prompt.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-purple-600">
          <Link href="https://fsai.pro" target="_blank" className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Powered by PapaBase
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Prompt Input */}
        <Card className="lg:col-span-2 border-purple-500/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
              Creative Brief
            </CardTitle>
            <CardDescription>Describe your brand, target audience, and primary goal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full h-48 rounded-md border bg-card p-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="e.g. A high-converting landing page for a boutique organic coffee roaster in Seattle. Focus on craftsmanship and subscription availability."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                <span className="font-bold">One-Time Fee:</span> Generating your first page will automatically add a <span className="font-bold">$19.00 license fee</span> to your final invoice. You can remove this manually in settings.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t p-4">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 shadow-md" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Distilling Creative...</>
              ) : (
                <><Zap className="mr-2 h-4 w-4" /> Generate My Page</>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Live Preview */}
        <Card className="lg:col-span-3 overflow-hidden border-none shadow-2xl flex flex-col bg-slate-900">
          <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">Live Preview</span>
            </div>
            {generatedHtml && (
              <Button size="sm" variant="secondary" className="h-7 text-xs bg-slate-700 text-white hover:bg-slate-600 border-none">
                <Download className="mr-2 h-3.3 w-3" />
                Export HTML
              </Button>
            )}
          </div>
          <div className="flex-1 min-h-[500px] relative">
            {generatedHtml ? (
              <iframe
                srcDoc={generatedHtml}
                className="w-full h-full border-none"
                title="Preview"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4">
                <Monitor className="h-12 w-12 opacity-20" />
                <p className="text-sm italic">Waiting for your creative brief...</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex justify-center">
            <Link href="https://fsai.pro" target="_blank" className="group">
              <p className="text-[10px] text-slate-400 font-medium">
                Want to build something bigger? <span className="text-purple-400 group-hover:underline">Check out PapaBase Pro by FullStack AI</span>
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}