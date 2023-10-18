import React from "react";
import "./mobile-page.scss";

export default function MobilePage() {
  return (
    <div className="mobile-page">
      <div className="mobile-page__content">
        <h2>This app is not suitable for mobile devices</h2>
        <h2>Please use this application on a desktop computer</h2>
      </div>
    </div>
  );
}
