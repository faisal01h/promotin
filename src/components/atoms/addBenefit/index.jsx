import React, { useState } from "react";
import "./addBenefit.scss";

function AddBenefit({ benefitValue }) {
  const [benefits, setBenefits] = useState([]);
  const [benefit, setBenefit] = useState("");
  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState("");
  const [inputed, setInputed] = useState(false);

  function handleAddDetail(e) {
    e.preventDefault();

    const newDetail = {
      id: new Date().getTime(),
      text: detail,
    };

    setDetails([...details].concat(newDetail));
    setDetail("");
    setInputed(true);
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

  function deleteItem(id) {
    const updateItem = [...benefits].filter((item) => item.id !== id);

    setBenefits(updateItem);
  }

  return (
    <div className="add-new-wrapper">
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
          <input
            type="text"
            placeholder="Rp 1.000.000"
            className="benefit-detail"
            name="detail-benefit"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          {details.map((detail) => (
            <div className="detail" key={detail.id}>
              {detail.text}
            </div>
          ))}

          <p onClick={handleAddDetail}>+ tambah detail</p>
        </div>

        <button className="input-btn" onClick={handleNewBenefit}>
          tambah benefit
        </button>
      </div>

      <div className="benefit-added">
        {benefits.map((benefit) => (
          <div className="benefit" key={benefit.id}>
            <p className="b-text">
              {benefit.text}
              <span className="del" onClick={() => deleteItem(benefit.id)}>
                x
              </span>
            </p>
            {benefit.detail.map((detail) => (
              <div className="detail" key={detail.id}>
                <li className="b-detail">{detail.text}</li>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddBenefit;
