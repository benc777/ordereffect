import { create } from "zustand";
import Fuse from "fuse.js";
import { models } from "../data/models";
import { tags } from "../data/tags";
import { references } from "../data/references";
import { collections } from "../data/collections";
import type { Model, SearchResult, Space, Tag } from "../types";

const fuse = new Fuse(
  [
    ...models.map((model) => ({
      id: model.id,
      kind: "model" as const,
      title: model.name,
      subtitle: model.tldr,
      payload: model
    })),
    ...tags.map((tag) => ({
      id: tag.id,
      kind: "tag" as const,
      title: tag.name,
      subtitle: tag.synonyms?.join(", ") ?? undefined,
      payload: tag
    })),
    ...references.map((reference) => ({
      id: reference.id,
      kind: "reference" as const,
      title: reference.title,
      subtitle: reference.source,
      payload: reference
    })),
    ...collections.map((collection) => ({
      id: collection.id,
      kind: "collection" as const,
      title: collection.name,
      subtitle: collection.intro,
      payload: collection
    }))
  ],
  {
    keys: ["title", "subtitle"],
    threshold: 0.3,
    includeMatches: true,
    ignoreLocation: true
  }
);

type SortOption = "recent" | "difficulty";

type LibraryState = {
  activeSpace: Space;
  activeModelId?: string;
  activeCollectionId?: string;
  compareSelection: string[];
  searchQuery: string;
  searchResults: SearchResult[];
  tagFilters: string[];
  darkMode: boolean;
  sortBy: SortOption;
  setSpace: (space: Space) => void;
  openModel: (modelId: string) => void;
  openCollection: (collectionId: string) => void;
  toggleCompare: (modelId: string) => void;
  updateSearch: (query: string) => void;
  clearSearch: () => void;
  toggleTag: (tagId: string) => void;
  setTags: (tagIds: string[]) => void;
  setDarkMode: (value: boolean) => void;
  setSortBy: (option: SortOption) => void;
};

export const useLibraryStore = create<LibraryState>((set, get) => ({
  activeSpace: "library",
  activeModelId: models[0]?.id,
  activeCollectionId: undefined,
  compareSelection: [],
  searchQuery: "",
  searchResults: [],
  tagFilters: [],
  darkMode: true,
  sortBy: "recent",
  setSpace: (space) => set({ activeSpace: space }),
  openModel: (modelId) => set({ activeModelId: modelId, activeSpace: "model" }),
  openCollection: (collectionId) =>
    set({ activeCollectionId: collectionId, activeSpace: "collections" }),
  toggleCompare: (modelId) => {
    const { compareSelection } = get();
    set({
      compareSelection: compareSelection.includes(modelId)
        ? compareSelection.filter((id) => id !== modelId)
        : [...compareSelection.slice(-2), modelId]
    });
  },
  updateSearch: (query) => {
    const normalized = query.trim();
    if (!normalized) {
      set({ searchQuery: "", searchResults: [] });
      return;
    }
    const results = fuse
      .search(normalized)
      .slice(0, 12)
      .map((item) => ({
        id: item.item.id,
        kind: item.item.kind,
        title: item.item.title,
        subtitle: item.item.subtitle,
        group:
          item.item.kind === "model"
            ? "Models"
            : item.item.kind === "tag"
            ? "Tags"
            : item.item.kind === "reference"
            ? "References"
            : "Collections",
        payload: item.item.payload
      }));

    set({ searchQuery: normalized, searchResults: results, activeSpace: "search" });
  },
  clearSearch: () => set({ searchQuery: "", searchResults: [] }),
  toggleTag: (tagId) => {
    const { tagFilters } = get();
    set({
      tagFilters: tagFilters.includes(tagId)
        ? tagFilters.filter((id) => id !== tagId)
        : [...tagFilters, tagId]
    });
  },
  setTags: (tagIds) => set({ tagFilters: tagIds }),
  setDarkMode: (value) => set({ darkMode: value }),
  setSortBy: (option) => set({ sortBy: option })
}));

export const filteredModels = (selectedTags: string[]): Model[] => {
  if (!selectedTags.length) return models;
  return models.filter((model) => selectedTags.every((tag) => model.tags.includes(tag)));
};

export const getTagById = (id: string): Tag | undefined => tags.find((tag) => tag.id === id);

export const getModelById = (id: string): Model | undefined => models.find((model) => model.id === id);
