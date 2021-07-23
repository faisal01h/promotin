import React, { useState } from "react";
import { useEffect } from "react";
import "./addBenefit.scss";

function AddBenefit({ benefitValue, updateValue, isUpdate }) {
  const [benefits, setBenefits] = useState([]);
  const [benefit, setBenefit] = useState("");
  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState("");
  const [inputed, setInputed] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setBenefits(updateValue);
      isUpdate = false;
    }
  }, [isUpdate]);

  function handleAddDetail(e) {
    e.preventDefault();

    if (detail) {
      const newDetail = {
        id: new Date().getTime(),
        text: detail,
      };

      setDetails([...details].concat(newDetail));
      setDetail("");
      setInputed(true);
    }
  }

  function handleAddBenefit() {
    if (benefit && inputed) {
      const newBenefit = {
        id: new Date().getTime(),
        text: benefit,
        detail: details,
      };

      setBenefits([...benefits].concat(newBenefit));
      setBenefit("");
    }
  }

  function handleNewBenefit(e) {
    e.preventDefault();

    if (benefit && inputed) {
      handleAddBenefit();
      setDetails([]);
      console.log(benefits);

      benefitValue(benefits);
    }
  }

  useEffect(() => {
    benefitValue(benefits);
  }, [benefits]);

  function deleteItem(id) {
    const updateItem = [...benefits].filter((item) => item.id !== id);

    setBenefits(updateItem);
  }

  function deleteDet(id) {
    const updateItem = [...details].filter((item) => item.id !== id);

    setDetails(updateItem);
  }

  return (
    <div className="add-new-wrapper">
      <div className="benefit-added">
        {benefits.map((benefit) => (
          <div className="benefit" key={benefit.id}>
            <p className="b-text">
              {benefit.text}
              <span className="del" onClick={() => deleteItem(benefit.id)}>
                hapus
              </span>
            </p>
            <div className="detail">
              {benefit.detail.map((detail) => (
                <li className="b-detail" key={detail.id}>
                  {detail.text}
                </li>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="item-wrapper">
        <label htmlFor="benefit-title">Beneftit yang Didapatkan</label>
        <input
          type="text"
          placeholder="Juara 1"
          className="benefit-title"
          name="benefit-title"
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
        />

        <div className="detail-wrapper">
          <label htmlFor="benefit-detail">Detail dari Benefit</label>
          <div className="add-detail-wrapper">
            <input
              type="text"
              placeholder="Rp 1.000.000"
              className="benefit-detail"
              name="detail-benefit"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) handleAddDetail(e);
              }}
            />
            <button
              className="add-detail-btn"
              onClick={(e) => handleAddDetail(e)}
            >
              Tambahkan
            </button>
          </div>

          {details.map((detail) => (
            <div className="raw-detail" key={detail.id}>
              <p>{detail.text}</p>{" "}
              <span className="del" onClick={() => deleteDet(detail.id)}>
                hapus
              </span>
            </div>
          ))}
        </div>

        <button className="input-btn" onClick={handleNewBenefit}>
          Tambah Benefit
        </button>
      </div>
    </div>
  );
}

export default AddBenefit;
