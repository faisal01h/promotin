import React from "react";
import { Dropdown } from "../../atoms";
import "./filter.scss";

function Filter() {
  const items = [
    {
      id: 1,
      value: "random",
    },
    {
      id: 2,
      value: "acak",
    },
    {
      id: 3,
      value: "coba",
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
            <Dropdown title={"Tingkatan"} />
            <Dropdown title={"Pelaksanaan"} />
          </div>
          <div className="r2">
            <Dropdown title={"Daerah"} />
            <Dropdown title={"Kategori"} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
