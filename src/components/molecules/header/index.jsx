import React, { useEffect, useState } from "react";
import { Menubar } from "../../atoms";
import "./header.scss";

function Header() {
  const [isLogin, setLogin] = useState(true);

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

      {isLogin ? (
        ""
      ) : (
        <div className="daftar-masuk-button">
          <a className="btn masuk" href={"/login"}>
            Masuk
          </a>
          <a className="btn daftar" href="/register">
            Daftar
          </a>
        </div>
      )}

      <Menubar login={isLogin} />
    </div>
  );
}

export default Header;
