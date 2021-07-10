import React from "react";
import { Dropdown } from "../../atoms";
import "./filter.scss";

function Filter() {
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
            <Dropdown title={"Tingkatan"} items={tingkatan} />
            <Dropdown title={"Pelaksanaan"} items={pelaksanaan} />
          </div>
          <div className="r2">
            <Dropdown title={"Daerah"} />
            <Dropdown title={"Kategori"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
