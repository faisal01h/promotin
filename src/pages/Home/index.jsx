import axios from "axios";
import React, { useEffect } from "react";
import { Gap, Line } from "../../components/atoms";
import { Filter, Item } from "../../components/molecules";
import "./home.scss";

function Home() {
  useEffect(() => {
    axios
      .get("http://promotin.herokuapp.com/api/v1/items/all/filter")
      .then((result) => {
        console.log("data API,", result);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  });

  return (
    <div>
      <Gap height={20} />
      <Filter />
      <Gap height={10} />
      <Line />
      <Gap height={10} />
      <h1>Populer saat ini</h1>
      <div className="item-container">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default Home;
