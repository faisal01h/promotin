import React, { useState, useEffect } from "react";
import { Dropdown } from "../../atoms";
import "./filter.scss";
import { Daerah, Kategori } from '../../../data'

function Filter({ selectedFilter, search }) {
  const [tipeValue, setTipeValue] = useState("");
  const [tingkatanValue, setTingkatanValue] = useState("");
  const [pelaksanaanValue, setPelaksanaanValue] = useState("");
  const [daerahValue, setDaerahValue] = useState("");
  const [kategoriValue, setKategoriValue] = useState("");

  const [filter, setFilter] = useState({
    title: "",
    tipe: "",
    tingkatan: "",
    pelaksanaan: "",
    daerah: "",
    kategori: "",
  });

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
      value: "SD",
    },
    {
      id: 2,
      value: "SMP",
    },
    {
      id: 3,
      value: "SMA/K",
    },
    {
      id: 4,
      value: "Perguruan Tinggi",
    },
    {
      id: 5,
      value: "Umum",
    },
  ];

  useEffect(() => {
    setFilter({
      ...filter,
      title: search,
      tipe: tipeValue,
      tingkatan: tingkatanValue,
      pelaksanaan: pelaksanaanValue,
      daerah: daerahValue,
      kategori: kategoriValue,
    });
  }, [
    search,
    tipeValue,
    tingkatanValue,
    pelaksanaanValue,
    daerahValue,
    kategoriValue,
  ]);

  useEffect(() => {
    selectedFilter(filter);
  }, [filter]);

  return (
    <div className="filter-container">
      <h2 className="kategori">Cari yang anda inginkan</h2>
      <div className="filter-wrapper">
        <div className="l-side-f">
          <div className="menu" onClick={() => setTipeValue("event")}>
            Event
          </div>
          <div className="menu" onClick={() => setTipeValue("lomba")}>
            Lomba
          </div>
          <div className="menu" onClick={() => setTipeValue("seminar")}>
            Seminar
          </div>
        </div>
        <div className="r-side-f">
          <div className="r1">
            <Dropdown
              title={"Tingkatan"}
              items={tingkatan}
              dropdownValue={(data) => setTingkatanValue(data)}
            />
            <Dropdown
              title={"Pelaksanaan"}
              items={pelaksanaan}
              dropdownValue={(data) => setPelaksanaanValue(data)}
            />
          </div>
          <div className="r2">
            <Dropdown
              title={"Daerah"}
              items={Daerah}
              dropdownValue={(data) => setDaerahValue(data)}
            />
            <Dropdown
              title={"Kategori"}
              items={Kategori}
              dropdownValue={(data) => setKategoriValue(data)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
