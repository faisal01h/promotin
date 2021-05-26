import React from "react";
import { Gap, Line } from "../../components/atoms";
import { Filter, Item } from "../../components/molecules";
import "./home.scss";

function Home() {
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
