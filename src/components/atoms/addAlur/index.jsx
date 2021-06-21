import React from "react";
import { useState } from "react";
import "./addAlur.scss";

function AddAlur({ alurValue }) {
  const [allAlur, setAllAlur] = useState([]);
  const [alur, setAlur] = useState("");
  const [detail, setDetail] = useState("");

  function handleAddAlur(e) {
    e.preventDefault();

    if (alur) {
      const newAlur = {
        id: new Date().getTime(),
        text: alur,
        detail: detail,
      };

      setAllAlur([...allAlur].concat(newAlur));
      setAlur("");
      setDetail("");

      alurValue(allAlur);
    }
  }

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <label htmlFor="alur-title">Judul Alur</label>
        <input
          type="text"
          placeholder="Juara 1"
          className="alur-title"
          name="alur-title"
          value={alur}
          onChange={(e) => setAlur(e.target.value)}
        />

        <div className="detail-wrapper">
          <label htmlFor="alur-detail">Detail dari Benefit</label>

          <input
            type="date"
            placeholder="Rp 1.000.000"
            className="alur-detail"
            name="detail-alur"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleAddAlur}>tambah Alur</button>

      <div className="detail-added">
        {allAlur.map((alur) => (
          <div className="alur" key={alur.id}>
            {alur.text}
            <div>{alur.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddAlur;
