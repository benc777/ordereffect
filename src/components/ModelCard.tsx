import { ArrowRight, GitCompare } from "lucide-react";
import { Model } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLibraryStore } from "../hooks/useLibraryStore";

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const { openModel, toggleCompare, compareSelection } = useLibraryStore((state) => ({
    openModel: state.openModel,
    toggleCompare: state.toggleCompare,
    compareSelection: state.compareSelection
  }));

  const isSelectedForCompare = compareSelection.includes(model.id);

  return (
    <Card className="group flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{model.name}</CardTitle>
          <Badge variant="outline" className="uppercase text-[10px] tracking-[0.2em] text-slate-500">
            {model.difficulty}
          </Badge>
        </div>
        <CardDescription>{model.tldr}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {model.when_to_use.slice(0, 3).map((chip) => (
            <Badge key={chip} variant="outline" className="bg-slate-900/40">
              {chip}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="rounded-2xl border-slate-800 bg-slate-900/40 text-slate-200"
            onClick={() => openModel(model.id)}
          >
            Open
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant={isSelectedForCompare ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => toggleCompare(model.id)}
            aria-pressed={isSelectedForCompare}
          >
            <GitCompare className="h-4 w-4" />
            <span className="ml-2 hidden text-xs sm:inline">Compare</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
