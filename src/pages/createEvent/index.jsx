import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Dropdown,
  AddBenefit,
  AddSk,
  AddAlur,
  AddFaq,
} from "../../components/";
import "./createEvent.scss";

function CreateEvent() {
  const [skValue, setSkValue] = useState([]);
  const [benefitValue, setBenefitValue] = useState([]);
  const [alurValue, setAlurValue] = useState([]);
  const [faqValue, setFaqValue] = useState([]);

  useEffect(() => {
    console.log(skValue);
    console.log(benefitValue);
    console.log(alurValue);
    console.log(faqValue);
  }, [skValue, benefitValue, alurValue, faqValue]);

  return (
    <div className="create-event-wrapper">
      <h1 className="title">Create Event</h1>

      <div className="form-wrapper">
        <form action="">
          <h2 className="sub-title">Poster</h2>
          <div className="form-input poster-image">
            <label htmlFor="poster-img"></label>
            <input type="file" name="poster-img" id="poster-img" />
          </div>

          <div className="form-input judul">
            <label htmlFor="judul">Judul</label>
            <input type="text" name="judul" id="judul" />
          </div>

          <h2 className="sub-title">Detail Event</h2>

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

          <div className="form-input deskripsi">
            <label htmlFor="deskripsi">Deskripsi</label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <h2 className="sub-title">Syarat dan Ketentuan</h2>
          <AddSk skValue={(data) => setSkValue(data)} />

          <h2 className="sub-titile">Benefit</h2>
          <AddBenefit benefitValue={(data) => setBenefitValue(data)} />

          <h2 className="sub-title">Alur</h2>
          <AddAlur alurValue={(data) => setAlurValue(data)} />

          <h2 className="sub-title">FAQ</h2>
          <AddFaq faqValue={(data) => setFaqValue(data)} />
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
