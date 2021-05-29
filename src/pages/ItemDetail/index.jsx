import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { Gap, Line } from "../../components/atoms";
import { poster } from "../../assets";

function ItemDetail() {
  const [info, setInfo] = useState(true);
  const refAlur = React.useRef();

  const scroll = (scrollOffset) => {
    refAlur.current.scrollLeft += scrollOffset;
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
            <h4 onClick={() => setInfo(true)}>Detail</h4>
            <h4 onClick={() => setInfo(false)}>Deskripsi</h4>
          </div>
          {info ? (
            <div className="detail">
              <p>Daerah : Sidoarjo</p>
              <p>Tingkat : Provinsi</p>
              <p>Tanggal : 20 Agustus 2021</p>
              <p>Jenis : On Site</p>
            </div>
          ) : (
            <div className="deskripsi">
              <p>
                lomba poster adalah Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quaerat cumque ea consequuntur, totam
                consequatur inventore tempora. Hic voluptates repellendus
                quisquam, pariatur non optio reprehenderit commodi ipsum ducimus
                minus mollitia sequi!
              </p>
            </div>
          )}
        </div>

        <Line width={100} />

        <div className="benefit">
          <h3>Benefit</h3>
          <div className="benefit-item">
            <p className="benefit-title">Hadiah Uang</p>
            <div className="benefit-item-detail">
              <p>Juara 1: Rp 5.000.000</p>
              <p>Juara 2: Rp 3.000.000</p>
              <p>Juara 3: Rp 1.500.000</p>
            </div>
          </div>
          <div className="benefit-item">
            <p className="benefit-title">Sertifikat</p>
            <div className="benefit-item-detail">
              <p>Semua peserta akan mendapat sertifikat peserta</p>
            </div>
          </div>
          <div className="benefit-item">
            <p className="benefit-title">Merchandise</p>
            <div className="benefit-item-detail">
              <p>Semua peserta akan mendapat merchandise</p>
            </div>
          </div>
        </div>

        <Line width={100} />

        <div className="alur">
          <h3>Alur</h3>

          <div className="detail-alur-wrapper">
            <button className="scroll-left" onClick={() => scroll(-150)}>
              LEFT
            </button>
            <div className="alur-menu" ref={refAlur}>
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
            <button className="scroll-right" onClick={() => scroll(150)}>
              RIGHT
            </button>
          </div>
        </div>

        <Line width={100} />

        <div className="faq">
          <h3>FAQ</h3>
          <div className="faq-item">
            <h4>Apakah tidak ada biaya pendaftaram?</h4>
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
        <p>Pendaftaran masih dibuka</p>

        <div className="btn-top">
          <a className="btn pesan" href="#">
            Chat
          </a>
          <a className="btn add-favorit" href="#">
            + Favorit
          </a>
        </div>
        <a className="btn daftar-event" href="#">
          Daftar
        </a>
      </div>
    </div>
  );
}

export default ItemDetail;
