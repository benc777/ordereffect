export type ReferenceType =
  | "book"
  | "paper"
  | "article"
  | "video"
  | "podcast"
  | "web"
  | "note";

export type Tag = {
  id: string;
  name: string;
  parentId?: string;
  synonyms?: string[];
  description?: string;
};

export type Reference = {
  id: string;
  type: ReferenceType;
  title: string;
  authors?: string[];
  source?: string;
  year?: number;
  url?: string;
  doi?: string;
  summary?: string;
  key_quotes?: string[];
  thumbnail?: string;
};

export type ModelVisualKind =
  | "flow"
  | "2x2"
  | "tree"
  | "loop"
  | "timeline"
  | "matrix"
  | "venn"
  | "sankey";

export type ModelVisual = {
  kind: ModelVisualKind;
  caption?: string;
};

export type ModelExample = {
  context: string;
  walkthrough: string;
};

export type ModelMetric = {
  name: string;
  how_to_measure: string;
};

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Model = {
  id: string;
  name: string;
  slug: string;
  tldr: string;
  definition: string;
  when_to_use: string[];
  steps: string[];
  heuristics?: string[];
  inputs?: string[];
  outputs?: string[];
  pitfalls?: string[];
  anti_patterns?: string[];
  examples: ModelExample[];
  visuals?: ModelVisual[];
  metrics?: ModelMetric[];
  related_model_ids: string[];
  tags: string[];
  references: string[];
  difficulty?: Difficulty;
  time_to_apply?: string;
  created_at: string;
  updated_at: string;
};

export type Collection = {
  id: string;
  name: string;
  intro: string;
  modelIds: string[];
  created_at: string;
  updated_at: string;
};

export type Space =
  | "library"
  | "model"
  | "collections"
  | "graph"
  | "compare"
  | "search"
  | "inbox"
  | "settings";

export type SearchResultKind = "model" | "tag" | "reference" | "collection";

export type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle?: string;
  group: "Models" | "Tags" | "References" | "Collections";
  payload: unknown;
};

export type EdgeType = "related" | "example_of" | "builds_on" | "conflicts_with";

export type GraphEdge = {
  source: string;
  target: string;
  type: EdgeType;
};
