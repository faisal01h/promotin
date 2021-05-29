import React from "react";
import "./line.scss";

function Line({ width }) {
  return <div className="line" style={{ width: width + "%" }}></div>;
}

export default Line;
