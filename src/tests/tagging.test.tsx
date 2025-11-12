import { render, screen, fireEvent } from "@testing-library/react";
import { TagBar } from "../components/TagBar";
import { LibraryView } from "../pages/LibraryView";
import { useLibraryStore } from "../hooks/useLibraryStore";

vi.mock("lucide-react", () => ({ GitCompare: (props: any) => <svg {...props} />, ArrowRight: (props: any) => <svg {...props} /> }));

const renderWithStore = () => {
  useLibraryStore.setState({ tagFilters: [] });
  return render(
    <div>
      <TagBar />
      <LibraryView />
    </div>
  );
};

describe("Tag filtering", () => {
  it("filters models by selected tags", () => {
    renderWithStore();

    const badge = screen.getByText(/First principles/i);
    fireEvent.click(badge.closest("button") ?? badge);

    expect(screen.getByText(/Filtered by/)).toBeInTheDocument();
    expect(screen.getByText(/First Principles Thinking/)).toBeInTheDocument();
    expect(screen.queryByText(/Pareto Principle/)).not.toBeInTheDocument();
  });
});
