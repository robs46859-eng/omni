"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  GitBranch, 
  Sparkles, 
  Search as SearchIcon, 
  Monitor, 
  Briefcase,
  LayoutDashboard,
  Database,
  Globe
} from "lucide-react";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-64"
      >
        <span className="inline-flex items-center">
          <SearchIcon className="mr-2 h-4 w-4" />
          Search everything...
        </span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a module, keyword, or action..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Core Operations">
            <CommandItem onSelect={() => runCommand(() => router.push("/executive"))}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
              <span>Executive Overview</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/sales"))}>
              <Database className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Sales & Revenue Tracking</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />

          <CommandGroup heading="Intelligence & Predictive">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/digital-it-girl"))}>
              <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
              <span>Digital IT Girl (Niche Scanner)</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/niche-explorer"))}>
              <SearchIcon className="mr-2 h-4 w-4 text-blue-500" />
              <span>NicheMarket Explorer</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/global-intelligence"))}>
              <Globe className="mr-2 h-4 w-4 text-indigo-500" />
              <span>Global Intelligence Hub</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Automation & Engineering">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/workflows"))}>
              <GitBranch className="mr-2 h-4 w-4 text-amber-500" />
              <span>Workflow Architect Library</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/public-beta"))}>
              <Monitor className="mr-2 h-4 w-4 text-rose-500" />
              <span>Public Beta (Software Tracker)</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/autopitch"))}>
              <Briefcase className="mr-2 h-4 w-4 text-slate-700" />
              <span>AutoPitch (Automation Sales)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}