import React from "react";
import "./item.scss";
import { poster } from "../../../assets";
import { Link } from "react-router-dom";

function Item({ id }) {

  return (
    <div className="item-wrapper">
      <Link to={`/item-detail/${id}`}>
        <img className="item-img" src={poster} alt="" />
      </Link>
    </div>
  );
}

export default Item;
