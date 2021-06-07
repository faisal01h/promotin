import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import "./header.scss";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const [isNav, setNav] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [isLogin, setLogin] = useState(false);

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
      <a id="brand" href={"/"}>
        Promotno
      </a>
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

      <div className={`menu + ${isOpen ? "menu-visible" : ""}`}>
        {isLogin ? (
          <div className="menu-head">
            <img src="" alt="gambar" />
            <h2>Nama</h2>
          </div>
        ) : (
          <div className="menu-head">
            <a className="btn masuk" href={"/login"}>
              Masuk
            </a>
            <a className="btn daftar" href="/register">
              Daftar
            </a>
          </div>
        )}

        <div className="menu-body">
          <a href="/myevent" className="menu-body-list">
            My Event
          </a>
          <a href="/registered-event" className="menu-body-list">
            Registered Event
          </a>
          <a href="/saved-event" className="menu-body-list">
            Saved Event
          </a>
          <a href="" className="menu-body-list">
            Setting
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
