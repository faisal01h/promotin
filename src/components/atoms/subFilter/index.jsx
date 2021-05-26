import React from "react";
import "./subfilter.scss";

function SubFilter({ placeholder, width, height }) {
  return (
    <div>
      <select
        id="filter"
        name="filter"
        style={{ width: width, height: height }}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
}

export default SubFilter;
