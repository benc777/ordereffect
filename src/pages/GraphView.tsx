import { KnowledgeGraph } from "../components/Graph";

export function GraphView() {
  return (
    <div className="h-[600px] rounded-3xl border border-slate-900/60 bg-slate-950/40 p-4">
      <KnowledgeGraph />
    </div>
  );
}
