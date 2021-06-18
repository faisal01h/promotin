import React from "react";
import { Dropdown, AddNew } from "../../components/";
import "./createEvent.scss";

function CreateEvent() {
  return (
    <div className="create-event-wrapper">
      <h1 className="title">Create Event</h1>

      <div className="form-wrapper">
        <form action="">
          <div className="form-input poster-image">
            <label htmlFor="poster-img"></label>
            <input type="file" name="poster-img" id="poster-img" />
          </div>

          <div className="form-input judul">
            <label htmlFor="judul">Judul</label>
            <input type="text" name="judul" id="judul" />
          </div>

          <div className="form-input deskripsi">
            <label htmlFor="deskripsi">Deskripsi</label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="form-input tanggal">
            <label htmlFor="tanggal">Tanggal Pelaksanaan</label>
            <input type="date" name="tanggal" id="tanggal" />
          </div>

          <div className="form-input provinsi">
            <label htmlFor="provinsi">Provinsi</label>
            <Dropdown title={"Provinsi"} />
          </div>

          <div className="form-input kab-kot">
            <label htmlFor="kab-kot">Kabupaten/Kota</label>

            <Dropdown title={"Kabupaten/Kota"} />
          </div>

          <div className="form-input alamat">
            <label htmlFor="alamat">Alamat Event</label>
            <input type="text" name="alamat" id="alamat" />
          </div>

          <div className="form-input tingkatan">
            <label htmlFor="tingkatan">Tingkatan</label>
            <Dropdown title={"Tingkatan"} />
          </div>

          <div className="form-input jenis">
            <label htmlFor="jenis">Jenis</label>
            <Dropdown title={"Jenis"} />
          </div>
        </form>

        <AddNew />
      </div>
    </div>
  );
}

export default CreateEvent;
