import React from "react";
import { SubFilter } from "../../atoms";
import "./filter.scss";

function Filter() {
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
          <div className="">
            <SubFilter placeholder={"Tingkatan"} />
            <SubFilter placeholder={"Pelaksanaan"} />
          </div>
          <div className="">
            <SubFilter placeholder={"Daerah"} />
            <SubFilter placeholder={"Kategori"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
