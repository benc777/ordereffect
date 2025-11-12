import { models } from "../data/models";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { VisualRenderer } from "./VisualRenderer";
import { Badge } from "./ui/badge";

export function CompareView() {
  const { compareSelection } = useLibraryStore((state) => ({ compareSelection: state.compareSelection }));
  const selectedModels = models.filter((model) => compareSelection.includes(model.id)).slice(0, 3);

  if (selectedModels.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        Select models from the library to compare side-by-side.
      </div>
    );
  }

  const sections: { label: string; render: (modelId: string) => React.ReactNode }[] = [
    {
      label: "TLDR",
      render: (id) => <p className="text-sm text-slate-200">{models.find((m) => m.id === id)?.tldr}</p>
    },
    {
      label: "When to use",
      render: (id) => (
        <ul className="space-y-1 text-xs text-slate-300">
          {models
            .find((m) => m.id === id)
            ?.when_to_use.map((item) => (
              <li key={item}>• {item}</li>
            ))}
        </ul>
      )
    },
    {
      label: "Steps",
      render: (id) => (
        <ol className="space-y-1 text-xs text-slate-300">
          {models
            .find((m) => m.id === id)
            ?.steps.map((step, index) => (
              <li key={step}>
                <span className="mr-2 rounded-full bg-slate-800 px-2 py-0.5 text-[10px]">{index + 1}</span>
                {step}
              </li>
            ))}
        </ol>
      )
    },
    {
      label: "Pitfalls",
      render: (id) => (
        <ul className="space-y-1 text-xs text-red-300">
          {models
            .find((m) => m.id === id)
            ?.pitfalls?.map((pitfall) => (
              <li key={pitfall}>⚠ {pitfall}</li>
            ))}
        </ul>
      )
    },
    {
      label: "Visual",
      render: (id) => {
        const model = models.find((m) => m.id === id);
        if (!model?.visuals?.length) return <p className="text-xs text-slate-500">No visual.</p>;
        return <VisualRenderer visual={model.visuals[0]} />;
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {selectedModels.map((model) => (
        <Card key={model.id} className="space-y-6 p-6">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-slate-100">{model.name}</CardTitle>
              <Badge variant="outline" className="uppercase text-[10px] tracking-[0.2em]">
                {model.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-slate-300">{model.tldr}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {sections.map((section) => (
              <div key={section.label} className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{section.label}</p>
                <div className="text-sm text-slate-200">{section.render(model.id)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
