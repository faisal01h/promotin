import React, { useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import "./menubar.scss";
import { useHistory } from "react-router-dom";

function Menubar({ login }) {
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState();
  const node = useRef();
  const history = useHistory();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  function handleOnClick(item) {
    setSelection([item]);
  }

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setOpen(!isOpen);
    }
    // outside click
    setOpen(false);
  };

  return (
    <div>
      <div className="menubar-container">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        {login ? (
          <div className="menubar-btn" onClick={() => setOpen(!isOpen)}>
            Username
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={`menubar ${isOpen ? "menubar-visible" : ""}`}>
        {login ? (
          <div className="menubar-head">
            <img src="" alt="gambar" />
            <h2>Nama</h2>
          </div>
        ) : (
          <div className="menubar-head">
            <a className="btn masuk" onClick={() => history.push("/login")}>
              Masuk
            </a>
            <a className="btn daftar" onClick={() => history.push("/register")}>
              Daftar
            </a>
          </div>
        )}

        <div className="menubar-body">
          <a
            onClick={() => history.push("/myevent")}
            className="menubar-body-list"
          >
            My Event
          </a>
          <a
            onClick={() => history.push("/registered-event")}
            className="menubar-body-list"
          >
            Registered Event
          </a>
          <a
            onClick={() => history.push("/saved-event")}
            className="menubar-body-list"
          >
            Saved Event
          </a>
          <a href="" className="menubar-body-list">
            Setting
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
