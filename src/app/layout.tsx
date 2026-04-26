import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { AuthProvider } from "@/components/shared/auth-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OmniScale | Unified Analytics Platform",
  description: "Enterprise-grade analytics for vertical integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background text-foreground overflow-hidden")}>
        <AuthProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/50">
                {children}
              </main>
            </div>
          </div>
          <AIAssistant />
        </AuthProvider>
      </body>
    </html>
  );
}
