import { GraphEdge } from "../types";

export const graphEdges: GraphEdge[] = [
  { source: "model-first-principles", target: "model-second-order", type: "builds_on" },
  { source: "model-first-principles", target: "model-inversion", type: "related" },
  { source: "model-second-order", target: "model-ooda", type: "related" },
  { source: "model-ooda", target: "model-pareto", type: "example_of" },
  { source: "model-inversion", target: "model-pareto", type: "conflicts_with" },
  { source: "model-ooda", target: "iteration", type: "related" },
  { source: "model-second-order", target: "risk", type: "related" }
];
