import React, {
  useState,
  MouseEvent,
  CSSProperties,
  useRef,
  useCallback,
} from "react";
import "./draggable-block.scss";
import CategoriesList from "../CategoriesList/CategoriesList";
import { usePositionContext } from "../../contexts";
import useScale from "../../contexts/ScaleContext";

export default function DraggableBlock() {
  const { scale } = useScale();
  const { isDraggable, blockCoordinates, moveBlockToCoordinates } =
    usePositionContext();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: blockCoordinates.x,
    y: blockCoordinates.y,
  });

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (isDraggable) {
        setIsDragging(true);
        const initialX = e.clientX - position.x;
        const initialY = e.clientY - position.y;

        const handleMouseMove = (e: Event): void => {
          const mouseEvent = e as unknown as MouseEvent;
          if (
            mouseEvent.clientX !== undefined &&
            mouseEvent.clientY !== undefined
          ) {
            const newX = mouseEvent.clientX - initialX;
            const newY = mouseEvent.clientY - initialY;
            setPosition({ x: newX, y: newY });
          }
        };

        const handleMouseUp = (): void => {
          setIsDragging(false);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove as EventListener);
        window.addEventListener("mouseup", handleMouseUp as EventListener);

        moveBlockToCoordinates(position.x, position.y);
      }
    },
    [isDraggable, position, moveBlockToCoordinates]
  );

  const blockStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    transition: isDragging ? "none" : "0.3s ease",
  };

  return (
    <div
      className={`dnd-block ${isDragging ? "active" : ""}`}
      onMouseDown={handleMouseDown}
      style={blockStyle}
    >
      <CategoriesList />
    </div>
  );
}
