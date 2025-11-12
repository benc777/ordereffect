import { ModelVisual } from "../types";
import { Card } from "./ui/card";

interface VisualRendererProps {
  visual: ModelVisual;
}

export function VisualRenderer({ visual }: VisualRendererProps) {
  const renderContent = () => {
    switch (visual.kind) {
      case "flow":
        return (
          <div className="flex items-center justify-between gap-3">
            {["Problem", "Invert", "Safeguards", "Execute"].map((step) => (
              <div key={step} className="flex-1 rounded-2xl bg-slate-900/60 p-4 text-center text-xs text-slate-200">
                {step}
              </div>
            ))}
          </div>
        );
      case "loop":
        return (
          <div className="relative h-48 w-full">
            <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-2">
              {"Observe".split("").map((letter, index) => (
                <span key={index} className="text-slate-500">
                  {letter}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-accent/50" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex w-56 justify-between text-xs text-slate-300">
                <span>Observe</span>
                <span>Orient</span>
                <span>Decide</span>
                <span>Act</span>
              </div>
            </div>
          </div>
        );
      case "2x2":
        return (
          <div className="grid h-48 grid-cols-2 grid-rows-2 gap-2">
            {["High impact", "Low impact", "High effort", "Low effort"].map((cell) => (
              <div key={cell} className="flex items-center justify-center rounded-2xl bg-slate-900/50 text-xs text-slate-300">
                {cell}
              </div>
            ))}
          </div>
        );
      case "tree":
        return (
          <div className="space-y-4">
            <div className="mx-auto w-48 rounded-2xl bg-slate-900/60 p-3 text-center text-xs text-slate-200">
              Core Truths
            </div>
            <div className="flex justify-center gap-4">
              {["Assumption A", "Assumption B", "Assumption C"].map((node) => (
                <div key={node} className="w-32 rounded-2xl bg-slate-900/40 p-3 text-center text-xs text-slate-300">
                  {node}
                </div>
              ))}
            </div>
          </div>
        );
      case "timeline":
        return (
          <div className="relative h-32">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-800" />
            <div className="absolute inset-0 flex justify-between">
              {["Now", "+1w", "+1m", "+1q"].map((marker) => (
                <div key={marker} className="flex flex-col items-center text-xs text-slate-300">
                  <span className="mb-2 h-3 w-3 rounded-full bg-accent" />
                  {marker}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="h-32 rounded-2xl bg-slate-900/60 text-center text-sm text-slate-400">
            Visual coming soon
          </div>
        );
    }
  };

  return (
    <Card className="space-y-3 p-5">
      {renderContent()}
      {visual.caption && <p className="text-xs text-slate-500">{visual.caption}</p>}
    </Card>
  );
}
