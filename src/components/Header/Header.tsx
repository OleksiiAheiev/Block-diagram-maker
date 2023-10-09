import React from "react";
import "./header.scss";
import { Cursor, Face } from "../icons";
import ScreenSize from "../ScreenSize/ScreenSize";
import { usePositionContext } from "../../contexts";

export default function Header() {
  const { setBlockCentered } = usePositionContext();

  const handleCenterButtonClick = (): void => {
    setBlockCentered(true);
  };

  return (
    <div className="header">
      <div className="header__logo">
        <h2>Services</h2>
        <Face className="face" />
      </div>

      <div className="list-view">
        <div className="list-view__menu">List View</div>
        <span onClick={handleCenterButtonClick}>
          <Cursor className="go-center" />
        </span>
        <ScreenSize />
      </div>
    </div>
  );
}
