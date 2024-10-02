import { useEffect, useState } from "react";
import { fetchWidgetState } from "./fetchWidgetState";
import BrightnessBar from "./components/BrightnessBar";
import Switch from "./components/Switch";

import spinner from "./assets/spinner.svg";
import minus from "./assets/minus.svg";
import plus from "./assets/plus.svg";
import bat from "./assets/battery.svg";
import "./App.css";

export interface LightingSettings {
  brightness: number;
  timeLeft: number;
  nightVision: boolean;
  duskTillDawn: boolean;
  flashing: boolean;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<Partial<LightingSettings> | null>(null);

  useEffect(() => {
    fetchWidgetState().then((data) => {
      setState(data as LightingSettings);
      setIsLoading(false);
    });
  }, []);

  const onBrighnessUp = () => {
    setState((prev) => ({
      ...prev,
      brightness:
        prev?.brightness !== undefined
          ? prev?.brightness + 20
          : prev?.brightness,
    }));
  };

  const onBrighnessDown = () => {
    setState((prev) => ({
      ...prev,
      brightness:
        prev?.brightness !== undefined
          ? prev?.brightness - 20
          : prev?.brightness,
    }));
  };

  const onToggleNightVision = () => {
    setState((prev) => ({ ...prev, nightVision: !prev?.nightVision }));
  };

  const onToggleDuskTillDawn = () => {
    setState((prev) => ({ ...prev, duskTillDawn: !prev?.duskTillDawn }));
  };

  const onToggleFlashing = () => {
    setState((prev) => ({ ...prev, flashing: !prev?.flashing }));
  };

  return (
    <>
      <div className="container">
        <div className="brightness-bar--container">
          <h4>THR 08</h4>
          <BrightnessBar brightness={state?.brightness} />
        </div>

        <div className="controls-container">
          <div className="brightness-control">
            <button
              data-testid="plus-brightness"
              onClick={onBrighnessUp}
              disabled={state?.brightness === 100 || isLoading}
            >
              <img src={plus} alt="plus" style={{ height: "40px" }} />
            </button>
            <div data-testid="brightness">
              {isLoading ? (
                <img
                  src={spinner}
                  alt="Loading..."
                  style={{ height: "20px" }}
                />
              ) : (
                <>{state?.brightness}%</>
              )}
            </div>
            <button
              data-testid="minus-brightness"
              onClick={onBrighnessDown}
              disabled={state?.brightness === 0}
            >
              <img src={minus} alt="minus" style={{ height: "40px" }} />
            </button>
          </div>
          <div className="switch-control">
            <div data-testid="timeLeft">
              <div>
                <img src={bat} alt="battery" style={{ height: "20px" }} />
                <span>Time left </span>
              </div>
              {isLoading ? (
                <img
                  src={spinner}
                  alt="Loading..."
                  style={{ height: "20px" }}
                />
              ) : (
                <span>{state?.timeLeft}h</span>
              )}
            </div>

            <Switch
              isLoading={isLoading}
              label="Night Vision"
              id={"nightVision"}
              isChecked={state?.nightVision}
              onToggleSwitch={onToggleNightVision}
            />
            <Switch
              isLoading={isLoading}
              label="Dusk Til Down"
              id={"duskTillDawn"}
              isChecked={state?.duskTillDawn}
              onToggleSwitch={onToggleDuskTillDawn}
            />
            <Switch
              isLoading={isLoading}
              label="Flashing"
              id={"flashing"}
              isChecked={state?.flashing}
              onToggleSwitch={onToggleFlashing}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
