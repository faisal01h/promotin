import React from "react";
import "./item.scss";
import { poster } from "../../../assets";

function Item() {
  return (
    <div className="item-wrapper">
      <img className="item-img" src={poster} alt="" />
    </div>
  );
}

export default Item;
