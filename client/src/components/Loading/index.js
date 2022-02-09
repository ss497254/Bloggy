import React from "react";
import "./style.css";

export default function Loading() {
  return (
    <div id="loading-body">
      <div className="loader">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
    </div>
  );
}
