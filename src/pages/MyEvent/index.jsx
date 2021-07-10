import React from "react";
import "./MyEvent.scss";
import { poster } from "../../assets";
import { Button } from "../../components/atoms";
import { useHistory } from "react-router";

function MyEvent() {
  const history = useHistory();

  return (
    <div className="myevent-wrapper">
      <h1 className="title">Event Saya</h1>
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
          <div className="pendaftar">
            <p>Pendaftar : 10</p>
            <a href="">Cek Pendaftar</a>
          </div>
          <div className="btn-wrapper">
            <Button title={"Edit"} />
            <Button title={"Hapus"} style={{ backgroundColor: "#ee1443" }} />
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
          <div className="pendaftar">
            <p>Pendaftar : 10</p>
            <a href="">Cek Pendaftar</a>
          </div>
          <div className="btn-wrapper">
            <Button title={"Edit"} />
            <Button
              title={"Hapus"}
              redirect={"item-detail/60bb681c6a55066de83bc051"}
              style={{ backgroundColor: "#ee1443" }}
            />
          </div>
        </div>
      </div>

      <Button
        title={"Create New Event"}
        addClass="create-event"
        onClick={() => history.push("/create-event")}
      />
    </div>
  );
}

export default MyEvent;
