import { useMemo } from "react";
import { models } from "../data/models";
import { references } from "../data/references";
import { tags } from "../data/tags";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { VisualRenderer } from "../components/VisualRenderer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../components/ui/hover-card";
import { Card, CardContent } from "../components/ui/card";
import { ReferenceCard } from "../components/ReferenceCard";
import { formatDate } from "../lib/utils";
import { Bookmark, Share2, PencilLine } from "lucide-react";

export function ModelView() {
  const { activeModelId, openModel, toggleCompare } = useLibraryStore((state) => ({
    activeModelId: state.activeModelId,
    openModel: state.openModel,
    toggleCompare: state.toggleCompare
  }));

  const model = useMemo(() => models.find((item) => item.id === activeModelId), [activeModelId]);

  const relatedModels = useMemo(
    () =>
      models.filter((candidate) =>
        model
          ? candidate.related_model_ids.includes(model.id) || model.related_model_ids.includes(candidate.id)
          : false
      ),
    [model]
  );

  const backlinks = useMemo(
    () => models.filter((candidate) => candidate.related_model_ids.includes(model?.id ?? "")),
    [model]
  );

  if (!model) {
    return <p className="text-slate-400">Select a model to explore details.</p>;
  }

  const outline = [
    { id: "definition", label: "Definition" },
    { id: "when-to-use", label: "When to use" },
    { id: "how-it-works", label: "How it works" },
    { id: "examples", label: "Examples" },
    { id: "pitfalls", label: "Pitfalls & limits" },
    { id: "metrics", label: "Metrics" },
    { id: "references", label: "References" }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article className="space-y-8">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-3xl border border-slate-900/80 bg-slate-950/70 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Model</p>
            <h1 className="text-2xl font-semibold text-slate-100">{model.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">{model.tldr}</Badge>
            <Button variant="ghost" size="icon" aria-label="Favorite">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Edit">
              <PencilLine className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section id="definition" className="space-y-4">
          <Card className="p-6">
            <p className="text-sm text-slate-200">{model.definition}</p>
          </Card>
        </section>

        <section id="when-to-use" className="space-y-3">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">When to use</h2>
          <div className="flex flex-wrap gap-2">
            {model.when_to_use.map((item) => (
              <Badge key={item} variant="outline" className="bg-slate-900/40">
                {item}
              </Badge>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">How it works</h2>
            <ol className="space-y-2 text-sm text-slate-200">
              {model.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {model.visuals?.[0] && <VisualRenderer visual={model.visuals[0]} />}
        </section>

        <section id="examples" className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Examples</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {model.examples.map((example) => (
              <Card key={example.context} className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{example.context}</p>
                <p className="mt-2 text-sm text-slate-200">{example.walkthrough}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pitfalls" className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Pitfalls & limits</h2>
          <ul className="space-y-2 text-sm text-red-300">
            {model.pitfalls?.map((pitfall) => (
              <li key={pitfall}>⚠ {pitfall}</li>
            ))}
          </ul>
        </section>

        {model.metrics && (
          <section id="metrics" className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Metrics</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {model.metrics.map((metric) => (
                <Card key={metric.name} className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.name}</p>
                  <p className="mt-2 text-sm text-slate-200">{metric.how_to_measure}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <footer className="space-y-6 border-t border-slate-900/60 pt-6">
          <section id="references" className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">References</h2>
            <div className="space-y-3">
              {model.references.map((referenceId) => {
                const reference = references.find((item) => item.id === referenceId);
                if (!reference) return null;
                return (
                  <HoverCard key={reference.id}>
                    <HoverCardTrigger asChild>
                      <div>
                        <ReferenceCard reference={reference} />
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p className="text-sm font-medium text-slate-100">{reference.title}</p>
                      {reference.summary && <p className="text-xs text-slate-400">{reference.summary}</p>}
                      {reference.url && (
                        <a
                          href={reference.url}
                          className="mt-2 inline-flex items-center text-xs text-accent hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open reference
                        </a>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Backlinks</h2>
            <div className="flex flex-wrap gap-2">
              {backlinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openModel(item.id)}
                  className="focus-visible:outline-none"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:border-accent hover:text-accent"
                  >
                    {item.name}
                  </Badge>
                </button>
              ))}
              {!backlinks.length && <p className="text-xs text-slate-500">No backlinks yet.</p>}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Compare with</h2>
            <div className="flex flex-wrap gap-2">
              {relatedModels.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCompare(item.id)}
                  className="focus-visible:outline-none"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:border-accent hover:text-accent"
                  >
                    {item.name}
                  </Badge>
                </button>
              ))}
            </div>
          </section>
        </footer>
      </article>

      <aside className="sticky top-6 hidden space-y-6 rounded-3xl border border-slate-900/80 bg-slate-950/40 p-6 lg:block">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Outline</p>
          <nav className="space-y-2 text-sm text-slate-400">
            {outline.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block rounded-xl px-3 py-2 transition hover:bg-slate-900/60 hover:text-slate-100">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tags</p>
          <div className="flex flex-wrap gap-2">
            {model.tags.map((tagId) => {
              const tag = tags.find((item) => item.id === tagId);
              if (!tag) return null;
              return (
                <Badge key={tag.id} variant="outline" title={tag.description} className="bg-slate-900/40">
                  {tag.name}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Metadata</p>
          <Card className="p-4">
            <CardContent className="space-y-1 text-xs text-slate-400">
              <p>Difficulty · {model.difficulty}</p>
              {model.time_to_apply && <p>Time to apply · {model.time_to_apply}</p>}
              <p>Updated · {formatDate(model.updated_at)}</p>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
