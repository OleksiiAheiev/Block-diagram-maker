import React from "react";
import "./main-page.scss";
import { Chevron } from "../components/icons";
import DraggableBlock from "../components/DraggableBlock/DraggableBlock";
import { usePositionContext } from "../contexts";

export default function MainPage() {
  const { moveBlockToCoordinates } = usePositionContext();

  const moveToTop = () => {
    moveBlockToCoordinates(0, -240);
  };

  const moveToLeft = () => {
    moveBlockToCoordinates(500, 0);
  };

  const moveToRight = () => {
    moveBlockToCoordinates(-500, 0);
  };

  const moveToBottom = () => {
    moveBlockToCoordinates(0, 240);
  };

  return (
    <div className="main-page">
      <div className="main-page__icon" onClick={moveToRight}>
        <Chevron className="icon up" />
      </div>
      <div className="main-page__icon" onClick={moveToTop}>
        <Chevron className="icon left" />
      </div>
      <div className="main-page__icon" onClick={moveToLeft}>
        <Chevron className="icon right" />
      </div>
      <div className="main-page__icon" onClick={moveToBottom}>
        <Chevron className="icon down" />
      </div>

      <div className="centered-block">
        <DraggableBlock />
      </div>
    </div>
  );
}
