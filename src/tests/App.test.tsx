import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";

describe("Brightness Control", () => {
  vi.mock("../fetchWidgetState", () => ({
    fetchWidgetState: vi.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              brightness: 20, // %
              timeLeft: 12, // h
              nightVision: false,
              duskTillDawn: true,
              flashing: true,
            });
          }, 500);
        })
    ),
  }));

  test("renders with initial state", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Time left")).toBeInTheDocument();
      expect(screen.getByTestId("brightness")).toBeInTheDocument();
    });
  });

  test("increase brightness", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const brightnessDisplay = screen.getByTestId("brightness");
    const brightnessBar = screen.getByTestId("brightness-bar");
    expect(brightnessBar.querySelectorAll("div.active").length).toBe(1);
    fireEvent.click(screen.getByTestId("plus-brightness"));
    expect(brightnessDisplay).toHaveTextContent("40%");
    expect(brightnessBar.querySelectorAll("div.active").length).toBe(2);
  });

  test("increase brightness button disabled on 100%", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const increaseButton = screen.getByTestId("plus-brightness");
    const brightnessDisplay = screen.getByTestId("brightness");
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(brightnessDisplay).toHaveTextContent("100%");
    expect(increaseButton).toBeDisabled();
  });

  test("decreases brightness", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const brightnessDisplay = screen.getByTestId("brightness");
    const brightnessBar = screen.getByTestId("brightness-bar");

    expect(brightnessDisplay).toHaveTextContent("20%");
    expect(brightnessBar.querySelectorAll("div.active").length).toBe(1);
    fireEvent.click(screen.getByTestId("minus-brightness"));
    expect(brightnessDisplay).toHaveTextContent("0%");
    expect(brightnessBar.querySelectorAll("div.active").length).toBe(0);
  });

  test("decreases brightness button disabled on 0%", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const decreaseButton = screen.getByTestId("minus-brightness");
    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("brightness")).toHaveTextContent("0%");
    expect(decreaseButton).toBeDisabled();
  });
});

describe("Swithers change values", () => {
  vi.mock("../fetchWidgetState", () => ({
    fetchWidgetState: vi.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              brightness: 20, // %
              timeLeft: 12, // h
              nightVision: true,
              duskTillDawn: true,
              flashing: true,
            });
          }, 500);
        })
    ),
  }));

  test("changes nightVision on toggle switch", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const nightVisionButton = within(
      screen.getByTestId("nightVision")
    ).getByRole("button");
    const nightVisionInput = nightVisionButton.querySelector("input");

    expect(nightVisionInput).toBeChecked();
    fireEvent.click(nightVisionButton);
    expect(nightVisionInput).not.toBeChecked();
  });

  test("changes duskTillDawn on toggle switch", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const duskTillDawnButton = within(
      screen.getByTestId("duskTillDawn")
    ).getByRole("button");
    const duskTillDawnInput = duskTillDawnButton.querySelector("input");

    expect(duskTillDawnInput).toBeChecked();
    fireEvent.click(duskTillDawnButton);
    expect(duskTillDawnInput).not.toBeChecked();
  });

  test("changes flashing on toggle switch", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const flashingButton = within(screen.getByTestId("flashing")).getByRole(
      "button"
    );
    const flashingInput = flashingButton.querySelector("input");

    expect(flashingInput).toBeChecked();
    fireEvent.click(flashingButton);
    expect(flashingInput).not.toBeChecked();
  });
});

describe("Time", () => {
  vi.mock("../fetchWidgetState", () => ({
    fetchWidgetState: vi.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              brightness: 20, // %
              timeLeft: 23, // h
              nightVision: true,
              duskTillDawn: true,
              flashing: true,
            });
          }, 500);
        })
    ),
  }));

  test("displays right battery timeLeft", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("brightness")).toHaveTextContent("20%")
    );

    const timeLeft = screen.getByTestId("timeLeft");
    expect(timeLeft).toHaveTextContent("Time left 23h");
  });
});

describe("Loading", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("displays loading on brightness display", async () => {
    const brightnessDisplayLoader = screen
      .getByTestId("brightness")
      .querySelector("img");
    expect(brightnessDisplayLoader).toBeInTheDocument();
  });

  test("displays loading on timeLeft", async () => {
    const btimeLeftLoader = screen.getByTestId("timeLeft").querySelector("img");
    expect(btimeLeftLoader).toBeInTheDocument();
  });

  test("displays loading on nightVision", async () => {
    const btimeLeftLoader = screen
      .getByTestId("nightVision")
      .querySelector("img");
    expect(btimeLeftLoader).toBeInTheDocument();
  });

  test("displays loading on duskTillDawn", async () => {
    const btimeLeftLoader = screen.getByTestId("duskTillDawn");
    expect(btimeLeftLoader).toBeInTheDocument();
  });

  test("displays loading on flashing", async () => {
    const btimeLeftLoader = screen.getByTestId("flashing");
    expect(btimeLeftLoader).toBeInTheDocument();
  });
});