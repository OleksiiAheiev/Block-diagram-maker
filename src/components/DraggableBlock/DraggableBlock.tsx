import React, {
  useState,
  MouseEvent,
  CSSProperties,
  useRef,
  useEffect,
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
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPosition({ x: blockCoordinates.x, y: blockCoordinates.y });
  }, [blockCoordinates]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    if (isDraggable) {
      setIsDragging(true);
      setInitialPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsMoving(true);
      moveBlockToCoordinates(position.x, position.y);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (isDragging) {
      const newX = e.clientX - initialPosition.x;
      const newY = e.clientY - initialPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setIsMoving(false);
  };

  const blockStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    transition: !isMoving ? "0.3s ease" : "none",
  };

  return (
    <div
      className={`dnd-block ${isDragging ? "active" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={blockStyle}
      ref={blockRef}
    >
      <CategoriesList />
    </div>
  );
}
