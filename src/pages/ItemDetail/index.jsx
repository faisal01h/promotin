import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { Gap, Line } from "../../components/atoms";
import { poster } from "../../assets";
import axios from "axios";
import { useParams } from "react-router";
import AuthenticationService from "../auth"

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

function ItemDetail() {
  const [info, setInfo] = useState("detail");
  const [itemData, setItemData] = useState([]);
  const [itemDesc, setItemDesc] = useState(null);
  const { id } = useParams();

  function handleFavClick() {
    if(AuthenticationService.getCurrentUser()) {
      axios.post("//promotin.herokuapp.com/api/v1/event/fav")
    } else window.location.href="/login";
  }

  useEffect(() => {
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
        {itemDesc ? <p className="tag">{itemDesc.tag}</p>: ""}

        <Gap height={20} />
        <div className="basic-info">
          <div className="basic-info-tag">
            <h4 onClick={() => setInfo("detail")}>Detail</h4>
            <h4 onClick={() => setInfo("deskripsi")}>Deskripsi</h4>
            <h4 onClick={() => setInfo("sk")}>Syarat dan Ketentuan</h4>
          </div>

          <div className="basic-info-desc">
            <div className={`detail ${info === "detail" ? "visible" : ""}`}>
              <p>Daerah : {itemData.daerah}</p>
              <p>Tingkat : {itemData.tingkatan}</p>
              <p>Tanggal : {itemDesc ? itemDesc.alur[0].date: "Tidak ditentukan"}</p>
              <p>Jenis : {itemDesc ? itemDesc.lokasi : "Tidak ditentukan"}</p>
            </div>

            <div
              className={`deskripsi ${info === "deskripsi" ? "visible" : ""}`}
            >
              <p>{itemDesc ? itemDesc.desc : ""}</p>
            </div>

            <div className={`sk ${info === "sk" ? "visible" : ""}`}>
              <p>Syarat dan Ketentuan</p>
              <ul>
                <li>Usia antara 13 - 16 tahun</li>
                <li>Berstatus siswa/i SMP</li>
                <li>Dilarang membawa gambar contoh</li>
                <li>Desain yang akan dibuat harus Original</li>
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
                    <div
                      className="benefit-item-detail"
                      key={benefit.title + benefit.description}
                    >
                      <h5>{benefit.title}</h5>
                      <p>{benefit.description} </p>
                      <p>Sertifikat</p>
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
                      <div
                        className="detail-alur"
                        key={alur.date + alur.description}
                      >
                        <h4>{alur.date}</h4>
                        <p>{alur.description}</p>
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
                  <div className="faq-item" key={faq.question + faq.answer}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div className="item-detail-button">
        <h2>Status</h2>
        <p className="status">Pendaftaran masih dibuka</p>

        <div className="btn-main">
          <a className="btn pesan" href="#">
            Chat
          </a>
          <a className="btn add-fav" href="#" onClick={handleFavClick}>
            + Fav
          </a>
          <a className="btn daftar-event" href="#">
            Daftar
          </a>
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default ItemDetail;
