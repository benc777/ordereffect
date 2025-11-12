import { Collection } from "../types";

export const collections: Collection[] = [
  {
    id: "collection-product-sprint",
    name: "Product Strategy Sprint",
    intro: "Use these models to sharpen product bets in one week.",
    modelIds: ["model-first-principles", "model-second-order", "model-pareto"],
    created_at: "2024-04-01T00:00:00.000Z",
    updated_at: "2024-05-10T00:00:00.000Z"
  },
  {
    id: "collection-foundations",
    name: "Mental Model Foundations",
    intro: "Start here to build a systems mindset.",
    modelIds: ["model-ooda", "model-first-principles"],
    created_at: "2024-02-01T00:00:00.000Z",
    updated_at: "2024-06-01T00:00:00.000Z"
  }
];
