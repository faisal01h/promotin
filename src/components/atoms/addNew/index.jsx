import React, { useEffect, useRef, useState } from "react";
import "./addNew.scss";

function AddNew() {
  const [detail, setDetail] = useState([""]);
  const addDetail = useRef();
  const title = [];

  function tambahDetail() {
    const text = "1";

    const item = detail;
    item.push(text);
    console.log(detail);
  }

  function onClickAddDetail() {
    console.log(addDetail.current);
    return <p>P</p>;
  }

  function item() {
    detail.map((item, index) => {
      return (
        <input
          key={index}
          type="text"
          placeholder={item}
          //   placeholder="Rp 1.000.000"
          className="benefit-detail"
        />
      );
    });
  }

  useEffect(() => {
    item();
  }, [detail]);

  return (
    <div className="add-new-wrapper">
      <div className="item-wrapper">
        <input type="text" placeholder="Juara 1" className="benefit-title" />

        <div className="detail-wrapper" ref={addDetail}>
          {/* {console.log(detail)}
          {detail.map((item, index) => {
            return (
              <input
                key={index}
                type="text"
                placeholder={item}
                //   placeholder="Rp 1.000.000"
                className="benefit-detail"
              />
            );
          })} */}

          <input
            type="text"
            placeholder="Rp 1.000.000"
            className="benefit-detail"
          />
          <button onClick={onClickAddDetail}>tambah detail</button>
        </div>
      </div>
      <p>tambah benefit</p>
    </div>
  );
}

export default AddNew;
