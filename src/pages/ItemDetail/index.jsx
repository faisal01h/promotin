import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { Gap, Line } from "../../components/atoms";
import { Bronze_fill, Gold_fill, poster, Silver_fill } from "../../assets";
import { Deskripsi, Detail, Sk } from "../../components/molecules";

function ItemDetail() {
  const [info, setInfo] = useState("detail");
  const refBenefit = React.useRef();

  const scroll = (ref, scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="detail-container">
      <div className="detail-image-wrapper">
        <img src={poster} alt="" className="detail-image" />
      </div>

      <div className="info">
        <h1>Lomba Poster</h1>
        <span>Desain Grafis</span>

        <Gap height={20} />
        <div className="basic-info">
          <div className="basic-info-tag">
            <h4 onClick={() => setInfo("detail")}>Detail</h4>
            <h4 onClick={() => setInfo("deskripsi")}>Deskripsi</h4>
            <h4 onClick={() => setInfo("sk")}>Syarat dan Ketentuan</h4>
          </div>
        </div>

        {info === "detail" ? (
          <Detail />
        ) : info === "deskripsi" ? (
          <Deskripsi />
        ) : info === "sk" ? (
          <Sk />
        ) : (
          ""
        )}

        <Line width={100} />

        <div className="benefit">
          <h3>Benefit</h3>
          <div className="benefit-scrollbar">
            <button
              className="benefit-scroll-left"
              onClick={() => scroll(refBenefit, -200)}
            >
              LEFT
            </button>
            <div className="benefit-item" ref={refBenefit}>
              {/* <p className="benefit-title">Hadiah Uang</p> */}
              <div
                className="benefit-item-detail"
                style={{ backgroundImage: `url(${Gold_fill})` }}
              >
                <h5>Juara 1</h5>
                <p> Uang Rp 5.000.000 </p>
                <p>Sertifikat</p>
              </div>
              <div
                className="benefit-item-detail"
                style={{ backgroundImage: `url(${Silver_fill})` }}
              >
                <h5>Juara 2</h5>
                <p> Uang Rp 3.000.000 </p>
                <p>Sertifikat</p>
              </div>
              <div
                className="benefit-item-detail"
                style={{ backgroundImage: `url(${Bronze_fill})` }}
              >
                <h5>Juara 3</h5>
                <p> Uang Rp 1.500.000 </p>
                <p>Sertifikat</p>
              </div>
            </div>
            <button
              className="benefit-scroll-right"
              onClick={() => scroll(refBenefit, 200)}
            >
              RIGHT
            </button>
          </div>
        </div>

        <Line width={100} />

        <div className="alur">
          <h3>Alur</h3>

          <div className="detail-alur-wrapper">
            <div className="alur-menu">
              <div className="detail-alur">
                <h4>1 Agustus 2021</h4>
                <p>pendaftaran</p>
              </div>
              <div className="detail-alur">
                <h4>10 Agustus 2021</h4>
                <p>Seleksi 1</p>
              </div>
              <div className="detail-alur">
                <h4>20 Agustus 2021</h4>
                <p>Penetuan dan pengumuman Juara</p>
              </div>
            </div>
          </div>
        </div>

        <Line width={100} />

        <div className="faq">
          <h3>FAQ</h3>
          <div className="faq-item">
            <h4>Apakah tidak ada biaya pendaftaran?</h4>
            <p>Lomba poster tidak dipungut biaya pendaftaran</p>
          </div>
          <div className="faq-item">
            <h4>Apakah peserta wajib membawa peralatan sendiri?</h4>
            <p>
              Pihak panitia hanya menyediakan kertas untuk poster, untuk
              peralatan lain yang diperlukan silahkan membawa sendiri
            </p>
          </div>
        </div>
      </div>

      <div className="item-detail-button">
        <h2>Status</h2>
        <p className="status">Pendaftaran masih dibuka</p>

        <div className="btn-main">
          <a className="btn pesan" href="#">
            Chat
          </a>
          <a className="btn add-fav" href="#">
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
