import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Menubar } from "../../atoms";
import AuthenticationService from "../../../pages/auth";
import "./header.scss";
import axios from "axios";

function Header({ search }) {
  const history = useHistory();
  const [isLogin, setLogin] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    AuthenticationService.getCurrentUser() ? setLogin(true) : setLogin(false);
  }, [isLogin]);

  // useEffect(() => {
  //   search(searchValue);
  // }, [searchValue]);

  function searchItem() {
    search(searchValue);
  }

  return (
    <div id="navbar">
      <a id="brand" onClick={() => window.location.href = "/"}>
        PromotBox
      </a>
      <div className="search">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) searchItem();
          }}
        />
        <button className="search-btn" type="submit" onClick={searchItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>

      {isLogin ? (
        ""
      ) : (
        <div className="daftar-masuk-button">
          <a
            className="btn masuk"
            // href={"/login"}
            onClick={() => history.push("/login")}
          >
            Masuk
          </a>
          <a
            className="btn daftar"
            // href="/register"
            onClick={() => history.push("/register")}
          >
            Daftar
          </a>
        </div>
      )}

      <Menubar login={isLogin} />
    </div>
  );
}

export default Header;
