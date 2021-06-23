import React from "react";
import { useState } from "react";
import "./addAlur.scss";

function AddAlur({ alurValue }) {
  const [allAlur, setAllAlur] = useState([]);
  const [alur, setAlur] = useState("");
  const [detail, setDetail] = useState("");

  function handleAddAlur(e) {
    e.preventDefault();

    if (alur && detail) {
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

  function deleteItem(id) {
    const updateItem = [...allAlur].filter((item) => item.id !== id);

    setAllAlur(updateItem);
  }

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <label htmlFor="alur-title">Judul Alur</label>
        <input
          type="text"
          placeholder="Pendaftaran"
          className="alur-title"
          name="alur-title"
          value={alur}
          onChange={(e) => setAlur(e.target.value)}
        />

        <div className="detail-wrapper">
          <label htmlFor="alur-detail">Detail dari Benefit</label>

          <input
            type="date"
            className="alur-detail"
            name="detail-alur"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <button className="input-btn" onClick={handleAddAlur}>
          tambah Alur
        </button>
      </div>

      <div className="detail-added">
        {allAlur.map((alur) => (
          <div className="alur" key={alur.id}>
            <p className="a-t">
              {alur.text}
              <span className="del" onClick={() => deleteItem(alur.id)}>
                x
              </span>
            </p>
            <div className="a-d">{alur.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddAlur;
