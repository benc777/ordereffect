# OrderEffect — Mental Models Library

OrderEffect is a minimalist mental models library built with React, TypeScript, Tailwind CSS, and shadcn/ui primitives. It delivers instant navigation across a graph of decision frameworks with deep linking, hoverable references, and keyboard-first ergonomics.

## Features

- **Seven spaces** – Library, Model, Collections, Graph, Compare, Search, Inbox, Settings.
- **Command palette** with fuzzy search across models, tags, references, and collections.
- **Hierarchical tags** with AND filtering, breadcrumbs, and hover definitions.
- **Model reading view** with sticky outline, inline visuals, reference hover previews, and backlinks.
- **Graph view** – interactive force-directed graph of models and tags.
- **Compare view** – side-by-side diff of up to three models.
- **Keyboard shortcuts** – `⌘K` search, `T` tag focus, `G` then `G` graph, `J/K` section scrolling.
- **Dark mode first** with accessible typography, spacing, and motion-sensitive interactions.

## Getting started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Testing

```bash
npm test
```

Vitest + Testing Library cover search, tagging, hover previews, and keyboard navigation.

## Build

```bash
npm run build
```

Creates a production-ready bundle in `dist/`.

## Importing data

The library accepts CSV or Markdown with the schema defined in `src/types.ts`. The starter dataset in `src/data/` includes five core mental models, hierarchical tags, references, collections, and graph edges. Extend these files or wire an importer to the Inbox space.

## Design system

- Typography: Inter, tuned for long-form reading.
- Palette: Slate neutrals with a single violet accent.
- Components: Tailwind + shadcn/ui primitives (buttons, badges, cards, command dialog, tabs, hover cards, switches).
- Micro-interactions: 200ms max, no bounce. Keyboard and screen reader ready.

## Folder structure

```
src/
  components/      // Shared UI and feature components
  data/            // Sample models, tags, references, graph
  hooks/           // Global zustand store + selectors
  pages/           // View-level components for each space
  tests/           // Vitest suites covering core flows
```

## Keyboard cheatsheet

- `⌘K`: Command search
- `T`: Focus tag bar
- `G` → `G`: Open Graph view
- `J` / `K`: Scroll between sections
- `F`: Favorite (placeholder)

## Accessibility & performance

- Semantic HTML with focus states and skip-friendly layout.
- PWA-ready architecture, static-first rendering, lazy visuals, and cached reference previews (hooks ready).
- Responsive from mobile to desktop with sticky rails and breathing room.

## Roadmap ideas

- Offline cache and sync service worker
- CSV/Markdown import automation in Inbox
- Advanced graph filtering and lasso collections
- Analytics with privacy-consent gate
