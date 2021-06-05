import React from "react";
import "./item.scss";
import { poster } from "../../../assets";

function Item({ id }) {
  return (
    <div className="item-wrapper">
      <a href={`/item-detail/${id}`}>
        <img className="item-img" src={poster} alt="" />
      </a>
    </div>
  );
}

export default Item;
