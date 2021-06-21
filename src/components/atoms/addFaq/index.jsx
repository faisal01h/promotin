import React from "react";
import { useState } from "react";
import "./addFaq.scss";

function AddFaq({ faqValue }) {
  const [allFaq, setAllFaq] = useState([]);
  const [faq, setFaq] = useState("");
  const [detail, setDetail] = useState("");

  function handleAddfaq(e) {
    e.preventDefault();

    if (faq) {
      const newfaq = {
        id: new Date().getTime(),
        text: faq,
        detail: detail,
      };

      setAllFaq([...allFaq].concat(newfaq));
      setFaq("");
      setDetail("");

      faqValue(allFaq);
    }
  }

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <label htmlFor="faq-title">Pertanyaan</label>
        <input
          type="text"
          placeholder="Juara 1"
          className="faq-title"
          name="faq-title"
          value={faq}
          onChange={(e) => setFaq(e.target.value)}
        />

        <div className="detail-wrapper">
          <label htmlFor="faq-detail">Jawaban</label>

          <input
            type="text"
            placeholder="Rp 1.000.000"
            className="faq-detail"
            name="detail-faq"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleAddfaq}>tambah faq</button>

      <div className="detail-added">
        {allFaq.map((faq) => (
          <div className="faq" key={faq.id}>
            {faq.text}
            <div>{faq.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddFaq;
