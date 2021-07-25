import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./addAlur.scss";

function AddAlur({ alurValue, updateValue }) {
  const [allAlur, setAllAlur] = useState([]);
  const [alur, setAlur] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (updateValue) {
      setAllAlur(updateValue);
    }
  }, [updateValue]);

  function handleChangeMonth(v) {
    switch (v) {
      case "01":
        return "Januari";

      case "02":
        return "Februari";

      case "03":
        return "Maret";

      case "04":
        return "April";

      case "05":
        return "Mei";

      case "06":
        return "Juni";

      case "07":
        return "Juli";

      case "08":
        return "Agustus";

      case "09":
        return "September";

      case "10":
        return "Oktober";

      case "11":
        return "November";

      case "12":
        return "Desember";

      default:
        break;
    }
  }

  function handleAddAlur(e) {
    e.preventDefault();

    if (alur && detail) {
      let updateDetail = detail.split("-");
      updateDetail[1] = handleChangeMonth(updateDetail[1]);
      updateDetail = updateDetail.reverse().join(" ");

      const newAlur = {
        id: new Date().getTime(),
        text: alur,
        detail: updateDetail,
      };

      setAllAlur([...allAlur].concat(newAlur));
      setAlur("");
      setDetail("");
    }
  }

  useEffect(() => {
    alurValue(allAlur);
  }, [allAlur]);

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
