import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import { ScaleProvider } from "./contexts/ScaleContext";
import { PositionProvider } from "./contexts/PositionContext";
import MobilePage from "./pages/MobilePage/MobilePage";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScaleProvider>
      <PositionProvider>
        {isMobile ? (
          <MobilePage />
        ) : (
          <div className="wrapper">
            <Header />
            <MainPage />
          </div>
        )}
      </PositionProvider>
    </ScaleProvider>
  );
}

export default App;
