import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { CommandSearch } from "./components/CommandSearch";
import { TagBar } from "./components/TagBar";
import { LibraryView } from "./pages/LibraryView";
import { ModelView } from "./pages/ModelView";
import { CollectionsView } from "./pages/CollectionsView";
import { GraphView } from "./pages/GraphView";
import { CompareView } from "./components/CompareView";
import { SearchView } from "./pages/SearchView";
import { InboxView } from "./pages/InboxView";
import { SettingsView } from "./pages/SettingsView";
import { useLibraryStore } from "./hooks/useLibraryStore";

const SPACE_LABELS: Record<string, string> = {
  library: "Library",
  model: "Model",
  collections: "Collections",
  graph: "Graph",
  compare: "Compare",
  search: "Search",
  inbox: "Inbox",
  settings: "Settings"
};

function Breadcrumbs({ space }: { space: string }) {
  return (
    <nav className="text-xs uppercase tracking-[0.3em] text-slate-500">
      Library · {SPACE_LABELS[space] ?? space}
    </nav>
  );
}

export default function App() {
  const { activeSpace, setSpace, darkMode } = useLibraryStore((state) => ({
    activeSpace: state.activeSpace,
    setSpace: state.setSpace,
    darkMode: state.darkMode
  }));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    let gSequence = 0;
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "g") {
        gSequence += 1;
        if (gSequence === 2) {
          setSpace("graph");
          gSequence = 0;
        }
        setTimeout(() => {
          gSequence = 0;
        }, 500);
        return;
      }
      if (event.key.toLowerCase() === "j") {
        window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" });
      }
      if (event.key.toLowerCase() === "k") {
        window.scrollBy({ top: -window.innerHeight * 0.5, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSpace]);

  const renderSpace = () => {
    switch (activeSpace) {
      case "library":
        return <LibraryView />;
      case "model":
        return <ModelView />;
      case "collections":
        return <CollectionsView />;
      case "graph":
        return <GraphView />;
      case "compare":
        return <CompareView />;
      case "search":
        return <SearchView />;
      case "inbox":
        return <InboxView />;
      case "settings":
        return <SettingsView />;
      default:
        return <LibraryView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <Breadcrumbs space={activeSpace} />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CommandSearch />
          </div>
          <TagBar />
          {renderSpace()}
        </div>
      </main>
    </div>
  );
}
