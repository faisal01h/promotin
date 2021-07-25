import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./addSk.scss";

function AddSk({ skValue, updateValue }) {
  const [allsk, setAllSk] = useState([]);
  const [sk, setSk] = useState("");

  useEffect(() => {
    if (updateValue) {
      setAllSk(updateValue);
    }
  }, [updateValue]);

  function handleAddSk(e) {
    e.preventDefault();

    if (sk) {
      const newSK = {
        id: new Date().getTime(),
        text: sk,
      };

      setAllSk([...allsk].concat(newSK));
      setSk("");
    }
  }

  useEffect(() => {
    skValue(allsk);
  }, [allsk]);

  function deleteItem(id) {
    const updateItem = [...allsk].filter((item) => item.id !== id);

    setAllSk(updateItem);
  }

  return (
    <div className="add-sk-wrapper">
      <div className="input-field">
        <input
          type="text"
          placeholder="usia minimal 13 tahun"
          className="sk"
          name="sk"
          value={sk}
          onChange={(e) => setSk(e.target.value)}
        />

        <button onClick={handleAddSk} className="sk-btn">
          Add SK
        </button>
      </div>

      {allsk.map((sk) => (
        <div className="sk-item" key={sk.id}>
          <p>{sk.text}</p>{" "}
          <span className="del" onClick={() => deleteItem(sk.id)}>
            x
          </span>
        </div>
      ))}
    </div>
  );
}

export default AddSk;
