import { render, screen, fireEvent } from "@testing-library/react";
import { CommandSearch } from "../components/CommandSearch";

vi.mock("lucide-react", () => ({
  Search: (props: any) => <svg {...props} />,
  ArrowUpRight: (props: any) => <svg {...props} />
}));

vi.mock("@radix-ui/react-dialog", async () => {
  const actual = await vi.importActual<any>("@radix-ui/react-dialog");
  return {
    ...actual,
    Root: ({ children }: any) => <div data-testid="dialog-root">{children}</div>,
    Portal: ({ children }: any) => <div>{children}</div>,
    Overlay: ({ children }: any) => <div>{children}</div>,
    Content: ({ children }: any) => <div>{children}</div>
  };
});

vi.mock("cmdk", () => ({
  Command: ({ children }: any) => <div>{children}</div>,
  Input: ({ onValueChange, ...props }: any) => (
    <input
      {...props}
      onChange={(event) => onValueChange?.(event.target.value)}
      data-testid="command-input"
    />
  ),
  List: ({ children }: any) => <div>{children}</div>,
  Empty: ({ children }: any) => <div>{children}</div>,
  Group: ({ children }: any) => <div>{children}</div>,
  Item: ({ children, onSelect }: any) => (
    <div data-testid="command-item" onClick={() => onSelect?.("id")}>{children}</div>
  )
}));

vi.mock("../hooks/useLibraryStore", async () => {
  const module = await vi.importActual<any>("../hooks/useLibraryStore");
  const store = module.useLibraryStore;
  store.setState({ searchResults: [], searchQuery: "" });
  return module;
});

describe("CommandSearch", () => {
  it("surfaces results when the query matches models", () => {
    render(<CommandSearch />);

    const trigger = screen.getByRole("button", { name: /open command palette/i });
    fireEvent.click(trigger);

    const input = screen.getByTestId("command-input");
    fireEvent.change(input, { target: { value: "First Principles" } });

    expect(screen.getByText(/First Principles Thinking/)).toBeInTheDocument();
  });
});
