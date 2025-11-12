import { useLibraryStore } from "../hooks/useLibraryStore";
import { Badge } from "../components/ui/badge";

export function SearchView() {
  const { searchResults } = useLibraryStore((state) => ({ searchResults: state.searchResults }));

  if (searchResults.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-900/60 bg-slate-900/40 p-12 text-center text-slate-400">
        Start typing to explore the library.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchResults.map((result) => (
        <div
          key={result.id}
          className="flex items-center justify-between rounded-3xl border border-slate-900/60 bg-slate-950/40 px-4 py-3 text-sm text-slate-100"
        >
          <div>
            <p className="font-medium">{result.title}</p>
            {result.subtitle && <p className="text-xs text-slate-500">{result.subtitle}</p>}
          </div>
          <Badge variant="outline" className="uppercase text-[10px] tracking-[0.2em]">
            {result.group}
          </Badge>
        </div>
      ))}
    </div>
  );
}
