import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";

function Dropdown({ title, items = [] }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(title);
  const node = useRef();

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  function handleOnClick(item) {
    setSelection([item]);
  }

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setOpen(!open);
    }
    // outside click
    setOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dd-header" role="button" onClick={() => setOpen(!open)}>
        {selection}
        <i
          className={`fas fa-chevron-down ${open ? "arrow-u" : "arrow-d"}`}
        ></i>
      </div>
      <ul className={`dd-list ${open ? "open" : ""}`} ref={node}>
        {items.map((item) => (
          <li
            className="dd-item"
            key={item.id}
            onClick={() => handleOnClick(item.value)}
          >
            <span className="item-value"></span>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
