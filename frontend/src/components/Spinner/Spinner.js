import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.3"
              flood-color="#F06C9B"
            />
          </filter>
        </defs>
        <circle className="spinner" cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

export default Spinner;
