import { Library, Layers, GitBranch, CircleDot, Search, Inbox, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useLibraryStore } from "../hooks/useLibraryStore";
import type { Space } from "../types";
import { cn } from "../lib/utils";

const NAV_ITEMS: { space: Space; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { space: "library", label: "Library", icon: Library },
  { space: "collections", label: "Collections", icon: Layers },
  { space: "graph", label: "Graph", icon: GitBranch },
  { space: "compare", label: "Compare", icon: CircleDot },
  { space: "search", label: "Search", icon: Search },
  { space: "inbox", label: "Inbox", icon: Inbox },
  { space: "settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const { activeSpace, setSpace } = useLibraryStore((state) => ({
    activeSpace: state.activeSpace,
    setSpace: state.setSpace
  }));

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-slate-900/60 bg-slate-950/40 px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="h-9 w-9 rounded-2xl bg-accent/20" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">OrderEffect</p>
          <p className="text-base font-semibold text-slate-100">Mental Models</p>
        </div>
      </div>
      <nav className="space-y-2">
        {NAV_ITEMS.map(({ space, label, icon: Icon }) => (
          <Button
            key={space}
            variant={activeSpace === space ? "default" : "ghost"}
            size="lg"
            className={cn(
              "w-full justify-start gap-3 rounded-2xl px-3",
              activeSpace === space ? "bg-accent/80 text-accent-foreground" : "text-slate-300"
            )}
            onClick={() => setSpace(space)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto space-y-3 rounded-3xl border border-slate-900/60 bg-slate-900/40 p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-200">Quick tour</p>
        <ul className="space-y-1">
          <li>⌘K · Search models & actions</li>
          <li>T · Focus tag filters</li>
          <li>G then G · Open graph view</li>
        </ul>
      </div>
    </aside>
  );
}
