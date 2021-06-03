import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";

function Dropdown({ title }) {
  const [open, setOpen] = useState(false);
  //   const [showOptionsList, setShowOptionsList] = useState(false);
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

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setOpen(!open);
      // console.log(node.current);
    }
    // outside click
    setOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dd-header" role="button" onClick={() => setOpen(!open)}>
        {title}
      </div>
      {/* {isComponentVisible && ( */}
      <ul className={`dd-list ${open ? "open" : ""}`} ref={node}>
        <li className="dd-item">siji</li>
        <li className="dd-item">loro</li>
        <li className="dd-item">telu</li>
      </ul>
      {/* )} */}
    </div>
  );
}

export default Dropdown;
