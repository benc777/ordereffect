import { Tag } from "../types";

export const TOP_TAXONOMY = [
  "Decision Making",
  "Strategy",
  "Systems",
  "Learning",
  "Behavior",
  "Markets",
  "Product",
  "Communication"
];

export const tags: Tag[] = [
  {
    id: "decision-making",
    name: "Decision Making",
    description: "Frameworks to improve choices under uncertainty"
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Models for long-horizon positioning and leverage"
  },
  {
    id: "systems",
    name: "Systems",
    description: "Understanding feedback loops and dynamics"
  },
  {
    id: "learning",
    name: "Learning",
    description: "Accelerating skill acquisition and knowledge"
  },
  {
    id: "behavior",
    name: "Behavior",
    description: "Human psychology and biases"
  },
  {
    id: "biases",
    name: "Biases",
    parentId: "behavior",
    synonyms: ["cognitive biases"],
    description: "Heuristics that skew judgment"
  },
  {
    id: "first-principles",
    name: "First principles",
    parentId: "decision-making",
    synonyms: ["root cause", "fundamental analysis"],
    description: "Break problems into elemental truths"
  },
  {
    id: "systems-thinking",
    name: "Systems thinking",
    parentId: "systems",
    synonyms: ["system dynamics"],
    description: "Mapping loops, stocks, and flows"
  },
  {
    id: "feedback-loops",
    name: "Feedback loops",
    parentId: "systems",
    description: "Reinforcing and balancing loops"
  },
  {
    id: "iteration",
    name: "Iteration",
    parentId: "learning",
    synonyms: ["loops", "continuous improvement"],
    description: "Rapid learning through cycles"
  },
  {
    id: "experimentation",
    name: "Experimentation",
    parentId: "product",
    description: "Testing hypotheses with data"
  },
  {
    id: "prioritization",
    name: "Prioritization",
    parentId: "strategy",
    synonyms: ["focus", "leverage"],
    description: "Choosing what matters most"
  },
  {
    id: "risk",
    name: "Risk",
    parentId: "decision-making",
    synonyms: ["uncertainty"],
    description: "Managing unknowns"
  }
];
