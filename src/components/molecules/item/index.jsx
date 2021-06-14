import React from "react";
import "./item.scss";
import { poster } from "../../../assets";
import { useHistory } from "react-router-dom";

function Item({ id }) {
  const history = useHistory();

  return (
    <div className="item-wrapper">
      <a onClick={() => history.push(`/item-detail/${id}`)}>
        <img className="item-img" src={poster} alt="" />
      </a>
    </div>
  );
}

export default Item;
