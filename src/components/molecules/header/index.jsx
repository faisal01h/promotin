import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import "./header.scss";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const [isNav, setNav] = useState(false);
  const [isMenu, setMenu] = useState(false);

  const showHamburger = () => {
    if (window.innerWidth <= 768) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(showHamburger);
  window.addEventListener("resize", showHamburger);

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
      {/* <div className="pembatas"></div> */}
      <div className="daftar-masuk-button">
        <a className="btn masuk" href="#">
          Masuk
        </a>
        <a className="btn daftar" href="#">
          Daftar
        </a>
      </div>

      <div className="burger" onClick={() => setMenu(!isMenu)}>
        {isNav ? <Hamburger toggled={isOpen} toggle={setOpen} /> : ""}
      </div>

      {isMenu ? (
        <ul id="menu">
          <a href="#">
            <li>Masuk</li>
          </a>
          <a href="#">
            <li>Daftar</li>
          </a>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
