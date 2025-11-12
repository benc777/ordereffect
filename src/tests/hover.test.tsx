import { render, screen } from "@testing-library/react";
import { ModelView } from "../pages/ModelView";
import { useLibraryStore } from "../hooks/useLibraryStore";

vi.mock("lucide-react", () => ({
  Bookmark: (props: any) => <svg {...props} />,
  Share2: (props: any) => <svg {...props} />,
  PencilLine: (props: any) => <svg {...props} />
}));

vi.mock("@radix-ui/react-hover-card", () => ({
  Root: ({ children }: any) => <div>{children}</div>,
  Trigger: ({ children }: any) => <div>{children}</div>,
  Content: ({ children }: any) => <div>{children}</div>
}));

vi.mock("../components/VisualRenderer", () => ({ VisualRenderer: () => <div>visual</div> }));

beforeEach(() => {
  useLibraryStore.setState({ activeModelId: "model-first-principles" });
});

describe("ModelView hover previews", () => {
  it("shows reference detail content", () => {
    render(<ModelView />);

    expect(screen.getByText(/Elon Musk on First Principles Thinking/)).toBeInTheDocument();
    expect(screen.getByText(/Break down problems/)).toBeInTheDocument();
  });
});
