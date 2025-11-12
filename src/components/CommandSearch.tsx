import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, ArrowUpRight } from "lucide-react";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./CommandDialog";
import type { SearchResult } from "../types";

export function CommandSearch() {
  const { searchResults, searchQuery, updateSearch, openModel, setSpace, setTags } =
    useLibraryStore((state) => ({
      searchResults: state.searchResults,
      searchQuery: state.searchQuery,
      updateSearch: state.updateSearch,
            openModel: state.openModel,
      setSpace: state.setSpace,
      setTags: state.setTags
    }));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    if (result.kind === "model") {
      openModel((result.payload as { id: string }).id);
    } else if (result.kind === "tag") {
      setTags([(result.payload as { id: string }).id]);
      setSpace("library");
    } else if (result.kind === "collection") {
      setSpace("collections");
    } else {
      setSpace("search");
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-900/80 bg-slate-900/60 px-4 py-2 text-left text-sm text-slate-400 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1">Search models, tags, references…</span>
        <kbd className="rounded-full border border-slate-800 bg-slate-900 px-2 py-1 text-[10px]">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="flex flex-col">
          <CommandInput
            value={searchQuery}
            onValueChange={updateSearch}
            autoFocus
            placeholder="Search models, tags, references, collections"
          />
          <CommandList>
            <CommandEmpty>No matches. Try a synonym.</CommandEmpty>
            {searchResults.length > 0 && (
              <CommandGroup heading="Results">
                {searchResults.map((result) => (
                  <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{result.title}</p>
                      {result.subtitle && <p className="text-xs text-slate-500">{result.subtitle}</p>}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
