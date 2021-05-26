import React, { useState } from "react";
// import { Squash as Hamburger } from "hamburger-react";
import "./header.scss";
// import useWindowDimensions from "../../hooks";

function Header() {
  // const [isOpen, setOpen] = useState(false);
  // const [show, setShow] = useState(false);
  // const { height, width } = useWindowDimensions();

  return (
    <div id="navbar">
      <p id="brand">Promotin</p>
      <div className="search">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </div>
      <div className="pembatas"></div>
      <div className="daftar-masuk-button">
        <a className="btn masuk" href="#">
          Masuk
        </a>
        <a className="btn daftar" href="#">
          Daftar
        </a>
      </div>

      {/* <Hamburger toggled={isOpen} toggle={setOpen} /> */}
    </div>
  );
}

export default Header;
