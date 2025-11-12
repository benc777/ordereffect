import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { useLibraryStore } from "../hooks/useLibraryStore";

vi.mock("../components/Sidebar", () => ({ Sidebar: () => <div data-testid="sidebar" /> }));
vi.mock("../components/CommandSearch", () => ({ CommandSearch: () => <div data-testid="command-search" /> }));
vi.mock("../components/TagBar", () => ({ TagBar: () => <div data-testid="tag-bar" /> }));
vi.mock("../pages/LibraryView", () => ({ LibraryView: () => <div>library view</div> }));
vi.mock("../pages/ModelView", () => ({ ModelView: () => <div>model view</div> }));
vi.mock("../pages/CollectionsView", () => ({ CollectionsView: () => <div>collections view</div> }));
vi.mock("../pages/SearchView", () => ({ SearchView: () => <div>search view</div> }));
vi.mock("../pages/InboxView", () => ({ InboxView: () => <div>inbox view</div> }));
vi.mock("../pages/SettingsView", () => ({ SettingsView: () => <div>settings view</div> }));
vi.mock("../components/CompareView", () => ({ CompareView: () => <div>compare view</div> }));
vi.mock("../pages/GraphView", () => ({ GraphView: () => <div>graph view</div> }));

beforeEach(() => {
  useLibraryStore.setState({ activeSpace: "library" });
});

describe("keyboard navigation", () => {
  it("switches to graph view when pressing g twice", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.keyboard("g");
    await user.keyboard("g");

    expect(screen.getByText(/graph view/)).toBeInTheDocument();
  });
});
