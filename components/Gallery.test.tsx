import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gallery from "./Gallery";

type ObserverCallback = IntersectionObserverCallback;

let observerCallbacks: ObserverCallback[] = [];

class ControllableIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  constructor(callback: ObserverCallback) {
    observerCallbacks.push(callback);
  }

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

const intersectGallery = () => {
  const target = document.createElement("div");
  const rect = target.getBoundingClientRect();

  act(() => {
    observerCallbacks.forEach((callback) =>
      callback(
        [
          {
            boundingClientRect: rect,
            intersectionRatio: 1,
            intersectionRect: rect,
            isIntersecting: true,
            rootBounds: null,
            target,
            time: performance.now(),
          },
        ],
        {} as IntersectionObserver,
      ));
  });
};

describe("Gallery", () => {
  beforeEach(() => {
    observerCallbacks = [];
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: ControllableIntersectionObserver,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders fallback copy when gallery items are empty", () => {
    render(<Gallery items={[]} />);

    const section = screen.getByRole("region", { name: /recente looks/i });
    const ui = within(section);

    expect(ui.getByText(/Nieuwe looks worden binnenkort toegevoegd/i)).toBeInTheDocument();
  });

  it("renders provided gallery items", () => {
    render(
      <Gallery
        items={[
          {
            id: "test-item",
            title: "Test Look",
            altText: "Test alt beschrijving",
            imageSrc: "/assets/images/classic-cut.jpg",
            aspect: "portrait",
          },
        ]}
      />,
    );

    expect(screen.getByText("Test Look")).toBeInTheDocument();
    expect(screen.getByAltText("Test alt beschrijving")).toBeInTheDocument();
  });

  it("does not render video elements before the gallery is near the viewport", () => {
    render(<Gallery />);

    expect(screen.queryByLabelText(/Video van een signature fade/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Video van een klassieke herensnit/i)).not.toBeInTheDocument();
  });

  it("renders the active video after intersection", () => {
    render(<Gallery />);

    intersectGallery();

    const activeVideo = screen.getByLabelText(/Video van een signature fade/i);

    expect(activeVideo.tagName).toBe("VIDEO");
    expect(activeVideo).toHaveAttribute("preload", "auto");
  });

  it("switches mounted video when the active slide changes", async () => {
    const user = userEvent.setup();
    render(<Gallery />);

    intersectGallery();
    await user.click(screen.getByRole("button", { name: /Volgende video/i }));

    const activeVideo = screen.getByLabelText(/Video van een klassieke herensnit/i);

    expect(activeVideo.tagName).toBe("VIDEO");
    expect(activeVideo).toHaveAttribute("preload", "auto");
  });
});
