import { filteredModels } from "../hooks/useLibraryStore";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { models } from "../data/models";
import { ModelCard } from "../components/ModelCard";
import { Badge } from "../components/ui/badge";

export function LibraryView() {
  const { tagFilters } = useLibraryStore((state) => ({ tagFilters: state.tagFilters }));
  const results = filteredModels(tagFilters);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
        <span>Models</span>
        <Badge variant="outline" className="bg-slate-900/40">
          {results.length} of {models.length}
        </Badge>
        {tagFilters.length > 0 && (
          <span className="text-[10px]">Filtered by {tagFilters.join(", ")}</span>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      {!results.length && (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
          No models match those tags yet. Try a broader filter.
        </div>
      )}
    </div>
  );
}
