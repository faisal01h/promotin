import React from "react";
import { useState } from "react";
import "./addSk.scss";

function AddSk({ skValue }) {
  const [allsk, setAllSk] = useState([]);
  const [sk, setSk] = useState("");

  function handleAddSk(e) {
    e.preventDefault();

    const newSK = {
      id: new Date().getTime(),
      text: sk,
    };

    setAllSk([...allsk].concat(newSK));
    setSk("");
    skValue(allsk);
  }

  return (
    <div className="add-sk-wrapper">
      <input
        type="text"
        placeholder="usia minimal 13 tahun"
        className="sk"
        name="sk"
        value={sk}
        onChange={(e) => setSk(e.target.value)}
      />

      <button onClick={handleAddSk}>Add SK</button>

      {allsk.map((sk) => (
        <div className="sk-item" key={sk.id}>
          <p>{sk.text}</p>
        </div>
      ))}
    </div>
  );
}

export default AddSk;
