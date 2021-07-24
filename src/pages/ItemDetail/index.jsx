import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { Gap, Line } from "../../components/atoms";
import { poster } from "../../assets";
import axios from "axios";
import { useParams } from "react-router";
import AuthenticationService from "../auth";

axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    const token = user.token;
    config.headers.Authorization = token;
  }

  return config;
});

function ItemDetail() {
  const [info, setInfo] = useState("detail");
  const [itemData, setItemData] = useState([]);
  const [itemDesc, setItemDesc] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

  function handleFavClick() {
    if (AuthenticationService.getCurrentUser() && isLiked === false) {
      axios.post("//promotin.herokuapp.com/api/v1/event/fav", {
        itemId: id,
      })
      .then((result) => {
        setIsLiked(true)
      })
    } else if(AuthenticationService.getCurrentUser() && isLiked === true) {
      axios.post("//promotin.herokuapp.com/api/v1/event/fav", {
        itemId: id,
      })
      .then((result) => {
        setIsLiked(false)
      })
    } else window.location.href = "/login";
  }

  useEffect(() => {
    axios.get("//promotin.herokuapp.com/api/v1/event/fav")
    .then(result => {
      console.log(result.data.data)
      result.data.data.filter((e) => {
        if(e === id) setIsLiked(true)
      })
      
      console.log(isLiked)
    })

    let mounted = false;

    axios
      .get(`https://promotin.herokuapp.com/api/v1/items/view/${id}`)
      .then((result) => {
        if (!mounted) {
          setItemData(result.data.data);
          setItemDesc(result.data.data.description);
        }
      })
      .catch((error) => {
        if (!mounted) {
          console.log(error);
        }
      });

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <div className="detail-container">
      <div className="detail-image-wrapper">
        <img src={poster} alt="" className="detail-image" />
      </div>

      <div className="info">
        <h1>{itemData.title}</h1>
        {itemDesc ? <p className="tag">{itemDesc.kategori}</p> : ""}

        <Gap height={20} />
        <div className="basic-info">
          <div className="basic-info-tag">
            <h4 onClick={() => setInfo("detail")}>Detail</h4>
            <h4 onClick={() => setInfo("deskripsi")}>Deskripsi</h4>
            <h4 onClick={() => setInfo("sk")}>Syarat dan Ketentuan</h4>
          </div>

          <div className="basic-info-desc">
            <div className={`detail ${info === "detail" ? "visible" : ""}`}>
              <p>Tingkat : {itemData.tingkatan}</p>
              <p>Daerah : {itemData.daerah}</p>
              <p>Alamat : {itemDesc? itemDesc.alamat : ""}</p>
              <p>
                Tanggal : {itemDesc ? itemDesc.tanggal : "Tidak ditentukan"}
              </p>
              <p>Jenis : {itemData ? itemData.jenis : "Tidak ditentukan"}</p>
            </div>

            <div
              className={`deskripsi ${info === "deskripsi" ? "visible" : ""}`}
            >
              <p>{itemDesc ? itemDesc.desc : ""}</p>
            </div>

            <div className={`sk ${info === "sk" ? "visible" : ""}`}>
              <ul>
                {itemDesc
                  ? itemDesc.sk.map((sk) => {
                      return <li key={sk.id}>{sk.text}</li>;
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>

        <Line width={100} />

        <div className="benefit">
          <h3>Benefit</h3>
          <div className="benefit-list">
            {itemDesc
              ? itemDesc.benefits.map((benefit) => {
                  return (
                    <div className="benefit-item-detail" key={benefit.id}>
                      <h5>{benefit.text}</h5>
                      {benefit.detail.map((detail) => {
                        return <p key={detail.id}>{benefit.text} </p>;
                      })}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        <Line width={100} />

        <div className="alur">
          <h3>Alur</h3>

          <div className="detail-alur-wrapper">
            <div className="alur-menu">
              {itemDesc
                ? itemDesc.alur.map((alur) => {
                    return (
                      <div className="detail-alur" key={alur.id}>
                        <h4>{alur.text}</h4>
                        <p>{alur.detail}</p>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>

        <Line width={100} />

        <div className="faq">
          <h3>FAQ</h3>
          {itemDesc
            ? itemDesc.faq.map((faq) => {
                return (
                  <div className="faq-item" key={faq.id}>
                    <h4>{faq.text}</h4>
                    <p>{faq.detail}</p>
                  </div>
                );
              })
            : ""}
        </div>

        <div className="item-detail-button">
          <button className="daftar-event" onClick={handleFavClick}>
            {
              isLiked === true?
                "Hapus dari Favorit"
              : "Tambahkan ke Favorit"
            }
          </button>
        </div>
      </div>
      {/* <div className="bottom"></div> */}
    </div>
  );
}

export default ItemDetail;
