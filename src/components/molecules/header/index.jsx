import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Menubar } from "../../atoms";
import AuthenticationService from "../../../pages/auth";
import "./header.scss";

function Header() {
  const history = useHistory();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    AuthenticationService.getCurrentUser() ? setLogin(true) : setLogin(false);
  }, [isLogin]);

  return (
    <div id="navbar">
      <a id="brand" onClick={() => history.push("/")}>
        PromotBox
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
