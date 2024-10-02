import { render, screen } from "@testing-library/react";
import BrightnessBar from "../components/BrightnessBar";

describe("BrightnessBar", () => {
  test("no active bars when brightness equal 0", () => {
    render(<BrightnessBar brightness={0} />);

    const brightnessBar = screen.getByTestId("brightness-bar");

    expect(brightnessBar.querySelectorAll("div.active").length).toBe(0);
  });

  test("5 active bars when brightness equal 100", () => {
    render(<BrightnessBar brightness={100} />);

    const brightnessBar = screen.getByTestId("brightness-bar");

    expect(brightnessBar.querySelectorAll("div.active").length).toBe(5);
  });

  test("2 active bars when brightness equal 50", () => {
    render(<BrightnessBar brightness={50} />);

    const brightnessBar = screen.getByTestId("brightness-bar");

    expect(brightnessBar.querySelectorAll("div.active").length).toBe(2);
  });
});
