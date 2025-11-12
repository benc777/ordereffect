import { useEffect, useRef } from "react";
import { tags, TOP_TAXONOMY } from "../data/tags";
import { Badge } from "./ui/badge";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { cn } from "../lib/utils";

export function TagBar() {
  const { tagFilters, toggleTag, setSpace } = useLibraryStore((state) => ({
    tagFilters: state.tagFilters,
    toggleTag: state.toggleTag,
    setSpace: state.setSpace
  }));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "t") {
        containerRef.current?.focus();
        setSpace("library");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSpace]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="scrollbar-thin flex gap-2 overflow-x-auto rounded-3xl border border-slate-900/80 bg-slate-950/40 p-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Tag filters"
    >
      {TOP_TAXONOMY.map((group) => (
        <div key={group} className="flex items-center gap-2 pr-2">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{group}</span>
          {tags
            .filter((tag) => tag.parentId === group.toLowerCase().replace(/ /g, "-"))
            .map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="focus:outline-none"
              >
                <Badge
                  variant={tagFilters.includes(tag.id) ? "accent" : "outline"}
                  className={cn(
                    "cursor-pointer transition hover:border-accent hover:text-accent",
                    tagFilters.includes(tag.id) && "border-accent/40 bg-accent/20 text-accent"
                  )}
                  title={tag.description}
                >
                  {tag.name}
                </Badge>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
