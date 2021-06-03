import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link, Router } from 'react-router-dom';
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
      <a id="brand" href={"/"}>Promotin</a>
      <div className="search">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="search-btn" type="submit">
          S
        </button>
      </div>
      {/* <div className="pembatas"></div> */}
      <div className="daftar-masuk-button">
        <a className="btn masuk" href={"/login"}>
          Masuk
        </a>
        <a className="btn daftar" href={"/register"}>
          Daftar
        </a>
      </div>

      <div className="burger" onClick={() => setMenu(!isMenu)}>
        {isNav ? <Hamburger toggled={isOpen} toggle={setOpen} /> : ""}
      </div>

      {isMenu ? (
        <ul id="menu">
          <a href={'/login'}>
            <li>Masuk</li>
          </a>
          <a href="/register">
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
