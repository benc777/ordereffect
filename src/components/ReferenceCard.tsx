import { Reference } from "../types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

interface ReferenceCardProps {
  reference: Reference;
}

export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <Card className="flex items-start justify-between gap-3 p-4">
      <CardContent className="space-y-2">
        <Badge variant="outline" className="uppercase text-[10px] tracking-[0.2em]">
          {reference.type}
        </Badge>
        <div>
          <p className="text-sm font-medium text-slate-100">{reference.title}</p>
          {reference.source && <p className="text-xs text-slate-500">{reference.source}</p>}
          {reference.summary && <p className="text-xs text-slate-400">{reference.summary}</p>}
        </div>
        <div className="flex gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {reference.year && <span>{reference.year}</span>}
          {reference.authors && <span>{reference.authors.join(" · ")}</span>}
        </div>
      </CardContent>
      {reference.url && (
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <a href={reference.url} target="_blank" rel="noopener noreferrer" aria-label="Open reference">
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      )}
    </Card>
  );
}
