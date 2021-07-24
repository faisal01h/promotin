import axios from "axios";
import React, { useEffect, useState } from "react";
import { Gap, Line } from "../../components/atoms";
import { Filter, Item } from "../../components/molecules";
import "./home.scss";

function Home({ search }) {
  const [dataItem, setDataItem] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [filterApplied, setFilterApplied] = useState(false);
  const [popularItem, setPopularItem] = useState(undefined);

  useEffect(() => {
    if(typeof selectedFilter === "object") {
      if( selectedFilter.daerah != "" ||
        selectedFilter.kategori != "" ||
        selectedFilter.pelaksanaan != "" ||
        selectedFilter.tingkatan != "" ||
        selectedFilter.tipe != "" ||
        selectedFilter.title != "") setFilterApplied(true);
    }
    axios
      .post("//promotin.herokuapp.com/api/v1/items/all/filter", selectedFilter)
      .then((result) => {
        if (result) {
          const responseAPI = result.data;

          setDataItem(responseAPI.data);
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, [selectedFilter]);

  useEffect(() => {
    setPopularItem(dataItem)
  }, [dataItem])

  useEffect(() => {
    if(popularItem) {
      popularItem.sort((a, b) => b.view - a.view)      
    }
  }, [popularItem])

  return (
    <div className="home">
      <Gap height={20} />
      <Filter
        selectedFilter={(data) => setSelectedFilter(data)}
        search={search}
      />
      <Gap height={10} />
      <Line />
      <Gap height={10} />
      {
        filterApplied===true ?
        <div>
          <h1>Hasil pencarian</h1>
          <div className="item-container">
            {dataItem.map((item) => {
              return <Item key={item._id} id={item._id} />;
            })}
          </div>
        </div>
        :
        <div>
          <h1>Populer saat ini</h1>
          <div className="item-container">
            {
            popularItem ? 
            popularItem.slice(0,5).map((item) => {
              return <Item key={item._id} id={item._id} />;
            })
            :""
            }
          </div>
          <Gap height={10} />
          <h1>Disarankan untuk anda</h1>
          <div className="item-container">
            {dataItem.map((item) => {
              return <Item key={item._id} id={item._id} />;
            })}
          </div>
        </div>
      }
      <Gap height={70} />
    </div>
  );
}

export default Home;
