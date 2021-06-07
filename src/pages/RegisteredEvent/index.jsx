import React from "react";
import "./RegisteredEvent.scss";
import { poster } from "../../assets";
import { Button } from "../../components/atoms";

function RegisteredEvent() {
  return (
    <div className="myevent-wrapper">
      <h1 className="title">Registered Event</h1>
      <div className="myevent-item">
        <img src={poster} alt="" className="poster-img" />
        <div className="detail-item">
          <h1 className="poster-title">Judul Poster</h1>
          <div className="detail">
            <p>Daerah : Sidoarjo</p>
            <p>Tingkat : SMA</p>
            <p>Tanggal : 20 Agustus 2021</p>
            <p>Jenis : On Site</p>
          </div>
        </div>
      </div>

      <div className="myevent-item">
        <img src={poster} alt="" className="poster-img" />
        <div className="detail-item">
          <h1 className="poster-title">Judul Poster</h1>
          <div className="detail">
            <p>Daerah : Sidoarjo</p>
            <p>Tingkat : SMA</p>
            <p>Tanggal : 20 Agustus 2021</p>
            <p>Jenis : On Site</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredEvent;
