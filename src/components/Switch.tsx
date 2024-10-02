import spinner from "../assets/spinner.svg";

interface Props {
  id: string;
  label: string;
  isLoading?: boolean;
  isChecked?: boolean;
  onToggleSwitch?: () => void;
}

function Switch({
  id,
  label,
  isChecked = false,
  onToggleSwitch,
  isLoading,
}: Props) {
  return (
    <div data-testid={id}>
      <label htmlFor={id}>{label}</label>
      {isLoading ? (
        <img src={spinner} alt="Loading..." style={{ height: "20px" }} />
      ) : (
        <div role="button" className="switch" onClick={onToggleSwitch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggleSwitch}
          />
          <div className="slider" />
        </div>
      )}
    </div>
  );
}

export default Switch;
