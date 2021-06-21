import React, { useState } from "react";
import "./addBenefit.scss";

function AddBenefit({ benefitValue }) {
  const [benefits, setBenefits] = useState([]);
  const [benefit, setBenefit] = useState("");
  const [details, setDetails] = useState([]);
  const [detail, setDetail] = useState("");

  function handleAddDetail(e) {
    e.preventDefault();

    const newDetail = {
      id: new Date().getTime(),
      text: detail,
    };

    setDetails([...details].concat(newDetail));
    setDetail("");
  }

  function handleAddBenefit() {
    if (benefit) {
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

    if (benefit) {
      handleAddBenefit();
      setDetails([]);
      console.log(benefits);

      benefitValue(benefits);
    }
  }

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <label htmlFor="benefit-title">Nama Beneftit yang Didapatkan</label>
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

          <button onClick={handleAddDetail}>tambah detail</button>
        </div>
      </div>
      <button onClick={handleNewBenefit}>tambah benefit</button>

      <div className="benefit-added">
        {benefits.map((benefit) => (
          <div className="benefit" key={benefit.id}>
            {benefit.text}
            {benefit.detail.map((detail) => (
              <div className="detail" key={detail.id}>
                {detail.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddBenefit;
