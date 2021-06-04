import axios from "axios";
import React, { useEffect, useState } from "react";
import { Gap, Line } from "../../components/atoms";
import { Filter, Item } from "../../components/molecules";
import "./home.scss";

function Home() {
  const [dataItem, setDataItem] = useState([]);

  useEffect(() => {
    axios
      .get("http://promotin.herokuapp.com/api/v1/items/all/filter")
      .then((result) => {
        console.log("data API,", result);
        const responseAPI = result.data;

        setDataItem(responseAPI.data);
        console.log(dataItem);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  });

  return (
    <div className="home">
      <Gap height={20} />
      <Filter />
      <Gap height={10} />
      <Line />
      <Gap height={10} />
      <h1>Populer saat ini</h1>
      <div className="item-container">
        {dataItem.map((item) => {
          return (
            <Item
              key={item._id}
              title={item.title}
              tingkatan={item.tingkatan}
              daerah={item.daerah}
              desc={item.description.desc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
