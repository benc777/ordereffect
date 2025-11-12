import { collections } from "../data/collections";
import { models } from "../data/models";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function CollectionsView() {
  const { openModel } = useLibraryStore((state) => ({ openModel: state.openModel }));

  return (
    <div className="space-y-6">
      <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500">Collections</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((collection) => (
          <Card key={collection.id} className="space-y-4 p-6">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg text-slate-100">{collection.name}</CardTitle>
              <p className="text-sm text-slate-400">{collection.intro}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {collection.modelIds.map((modelId, index) => {
                const model = models.find((item) => item.id === modelId);
                if (!model) return null;
                return (
                  <button
                    key={model.id}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-900/60 bg-slate-900/40 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-accent hover:text-accent"
                    onClick={() => openModel(model.id)}
                  >
                    <span>
                      {index + 1}. {model.name}
                    </span>
                    <Badge variant="outline" className="bg-slate-900/20">
                      {model.difficulty}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
