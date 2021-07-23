import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./addFaq.scss";

function AddFaq({ faqValue, updateValue, isUpdate }) {
  const [allFaq, setAllFaq] = useState([]);
  const [faq, setFaq] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (isUpdate) {
      setAllFaq(updateValue);
      isUpdate = false;
    }
  }, [isUpdate]);

  function handleAddfaq(e) {
    e.preventDefault();

    if (faq && detail) {
      const newfaq = {
        id: new Date().getTime(),
        text: faq,
        detail: detail,
      };

      setAllFaq([...allFaq].concat(newfaq));
      setFaq("");
      setDetail("");
    }
  }

  useEffect(() => {
    faqValue(allFaq);
  }, [allFaq]);

  function deleteItem(id) {
    const updateItem = [...allFaq].filter((item) => item.id !== id);

    setAllFaq(updateItem);
  }

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <label htmlFor="faq-title">Pertanyaan</label>
        <input
          type="text"
          placeholder="Apakah peralatan disediakan panitia?"
          className="faq-title"
          name="faq-title"
          value={faq}
          onChange={(e) => setFaq(e.target.value)}
        />

        <div className="detail-wrapper">
          <label htmlFor="faq-detail">Jawaban</label>

          <input
            type="text"
            placeholder="Peralatan akan disediakan panitia"
            className="faq-detail"
            name="detail-faq"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <button className="input-btn" onClick={handleAddfaq}>
          tambah faq
        </button>
      </div>

      <div className="detail-added">
        {allFaq.map((faq) => (
          <div className="faq" key={faq.id}>
            <p className="faq-t">
              {faq.text}
              <span className="del" onClick={() => deleteItem(faq.id)}>
                x
              </span>
            </p>
            <div className="faq-d">{faq.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddFaq;
