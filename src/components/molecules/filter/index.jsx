import React, { useState, useEffect } from "react";
import { Dropdown } from "../../atoms";
import "./filter.scss";
import axios from 'axios';

function Filter() {
  const [tingkatanValue, setTingkatanValue] = useState([]);
  const [pelaksanaanValue, setPelaksanaanValue] = useState([]);
  const [daerahValue, setDaerahValue] = useState([]);
  const [kategoriValue, setKategoriValue] = useState([]);

  const pelaksanaan = [
    {
      id: 1,
      value: "On Site/Offline",
    },
    {
      id: 2,
      value: "Online",
    },
  ];

  const tingkatan = [
    {
      id: 1,
      value: "SD/SMP/SMA/K",
    },
    {
      id: 2,
      value: "Perguruan Tinggi",
    },
    {
      id: 3,
      value: "Umum",
    },
  ];

  useEffect(() => {
    filterResult();
  })

  const filterResult = () => {
    axios.post("//promotin.herokuapp.com/api/v1/items/all/filter", {
      tingkatan: tingkatanValue,
      daerah: daerahValue,
      pelaksanaan: pelaksanaanValue,
      kategori: kategoriValue 
    })
    .then(result => {
      console.log(result)
    })
  }

  return (
    <div className="filter-container">
      <h2 className="kategori">Cari yang anda inginkan</h2>
      <div className="filter-wrapper">
        <div className="l-side-f">
          <div className="menu">Event</div>
          <div className="menu">Lomba</div>
          <div className="menu">Seminar</div>
        </div>
        <div className="r-side-f">
          <div className="r1">
            <Dropdown title={"Tingkatan"} items={tingkatan} dropdownValue={(data) => setTingkatanValue(data)} />
            <Dropdown title={"Pelaksanaan"} items={pelaksanaan} dropdownValue={(data) => setPelaksanaanValue(data)} />
          </div>
          <div className="r2">
            <Dropdown title={"Daerah"} dropdownValue={(data) => setDaerahValue(data)} />
            <Dropdown title={"Kategori"} dropdownValue={(data) => setKategoriValue(data)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
