import { render, within, screen, fireEvent } from "@testing-library/react";
import Switch from "../components/Switch";
import { useState } from "react";

function TestSwitchComponent() {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Switch
      id="testid"
      label="Test label"
      isChecked={isChecked}
      onToggleSwitch={handleToggleSwitch}
    />
  );
}

describe("Switch", () => {
  test("switch can be toggled", () => {
    render(<TestSwitchComponent />);

    const switchButton = within(screen.getByTestId("testid")).getByRole(
      "button"
    );
    const switchInput = switchButton.querySelector("input");

    expect(switchInput).toBeChecked();

    fireEvent.click(switchButton);

    expect(switchInput).not.toBeChecked();
  });

  test("displays spinner on loading", () => {
    render(<Switch id="testid" label="Test label" isLoading={true} />);

    expect(
      screen.getByTestId("testid").querySelector("img")
    ).toBeInTheDocument();
  });

  test("does not display the input during loading", () => {
    render(<Switch id="testid" label="Test label" isLoading={true} />);

    const switchInput = screen.getByTestId("testid").querySelectorAll("input");
    expect(switchInput.length).toBe(0);
  });

  test("displays 'Test label'", () => {
    render(<Switch id="testid" label="Test label" isLoading={true} />);

    expect(
      screen.getByTestId("testid").querySelector("label")
    ).toHaveTextContent("Test label");
  });
});
