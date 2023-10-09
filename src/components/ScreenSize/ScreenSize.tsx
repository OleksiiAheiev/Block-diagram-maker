import React, { useState } from "react";
import "./screen-size.scss";
import useScale from "../../contexts/ScaleContext";

export default function ScreenSize() {
  const { setDefaultScale, scale: currentScale } = useScale();

  const [currentSize, setCurrentSize] = useState(100);
  const [showOptions, setShowOptions] = useState(false);

  const sizes = [25, 50, 75, 100, 125, 150, 175, 200];

  const handleSizeChange = (size: number): void => {
    setCurrentSize(size);
    setShowOptions(false);

    const targetScale = size / 100;

    if (targetScale !== currentScale) {
      setDefaultScale(targetScale);
    }
  };

  return (
    <div className="screen-size">
      <div className="controls">
        <button
          onClick={() => handleSizeChange(currentSize - 10)}
          disabled={currentSize <= 10}
        >
          -
        </button>
        <button onClick={() => setShowOptions(!showOptions)}>
          {currentSize}%
        </button>
        <button onClick={() => handleSizeChange(currentSize + 10)}>+</button>
      </div>
      {showOptions && (
        <ul className="size-options">
          {sizes.map((size) => (
            <li key={size} onClick={() => handleSizeChange(size)}>
              {size}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
