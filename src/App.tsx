import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import { ScaleProvider } from "./contexts/ScaleContext";
import { PositionProvider } from "./contexts/PositionContext";

function App() {
  return (
    <ScaleProvider>
      <PositionProvider>
        <div className="wrapper">
          <Header />
          <MainPage />
        </div>
      </PositionProvider>
    </ScaleProvider>
  );
}

export default App;
