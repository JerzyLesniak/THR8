const SEGMENTS_NUMBER = 5;

interface Props {
  brightness?: number;
}

function BrightnessBar({ brightness }: Props) {
  const activeSegments = brightness ? Math.floor(brightness / 20) : 0;

  return (
    <div data-testid="brightness-bar" className="brightness-bar">
      {renderSegments(activeSegments)}
    </div>
  );
}

export default BrightnessBar;

const renderSegments = (activeSegments: number) => {
  return Array.from({ length: SEGMENTS_NUMBER }, (_, index) => {
    const isActive = index < activeSegments;
    return (
      <div
        key={`segment-${index}`}
        className={isActive ? "active" : ""}
      />
    );
  });
};
