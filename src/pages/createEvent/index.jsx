import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Blank_img } from "../../assets";
import {
  Button,
  Line,
  Dropdown,
  AddBenefit,
  AddSk,
  AddAlur,
  AddFaq,
} from "../../components/";
import "./createEvent.scss";

function CreateEvent() {
  const [previewImg, setPreviewImg] = useState(Blank_img);
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

  function submitPoster(itemId) {
    let formData = new formData();
    let img = document.querySelector('input[type="file"]').files[0];
    formData.append('itemId', itemId);
    formData.append('image', img);

    axios.post('//promotin.herokuapp.com/api/v1/items/new/image', formData)
    .then(result => {

    })
  }

  function handleSubmitClick() {
    axios.post('//promotin.herokuapp.com/api/v1/items/new', {

    })
    .then(result => {
      console.log(result);
      submitPoster();
    })
    
  }

  function handleImagePreview(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="create-event-wrapper">
      <h1 className="title">Create Event</h1>
      <Line width={100} />

      <div className="form-wrapper">
        <form>
          <div className="f-wp">
            <h2 className="sub-title">Upload Poster</h2>
            <div className="form-input poster-image">
              <label htmlFor="poster-img">
                <img
                  src={previewImg}
                  alt=""
                  className="preview-img"
                  onDrop={handleImagePreview}
                />
              </label>
              <input
                type="file"
                title=""
                name="poster-img"
                id="poster-img"
                onChange={handleImagePreview}
              />
            </div>

            <div className="form-input judul">
              <label htmlFor="judul">Judul Event</label>
              <input
                type="text"
                name="judul"
                id="judul"
                placeholder="Seminar IT"
              />
            </div>
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Detail Event</h2>

            <div className="form-input tanggal">
              <label htmlFor="tanggal">Tanggal Pelaksanaan</label>
              <input type="date" name="tanggal" id="tanggal" />
            </div>

            <div className="form-tempat">
              <div className="form-input provinsi">
                <label htmlFor="provinsi">Provinsi</label>
                <Dropdown title={"Provinsi"} />
              </div>

              <div className="form-input kab-kot">
                <label htmlFor="kab-kot">Kabupaten/Kota</label>

                <Dropdown title={"Kabupaten/Kota"} />
              </div>
            </div>

            <div className="form-input alamat">
              <label htmlFor="alamat">Alamat Event</label>
              <input type="text" name="alamat" id="alamat" />
            </div>

            <div className="form-input tingkatan">
              <p>Tingkatan</p>
              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="sd-smp-sma-k"
                  value="sd-smp-sma-k"
                />
                <label htmlFor="sd-smp-sma-k">SD/SMP/SMA/K</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="perguruan-tinggi"
                  value="perguruan-tinggi"
                />
                <label htmlFor="perguruan-tinggi">Perguruan Tinggi</label>
              </div>

              <div className="radio-option">
                <input type="radio" name="tingkatan" id="umum" value="umum" />
                <label htmlFor="umum">Umum</label>
              </div>
            </div>

            <div className="form-input jenis">
              <p>Jenis</p>

              <div className="radio-option">
                <input
                  type="radio"
                  name="jenis"
                  id="onsite-offline-luring"
                  value="onsite-offline-luring"
                />
                <label htmlFor="onsite-offline-luring">
                  On Site/Offline
                </label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="jenis"
                  id="offsite-online-daring"
                  value="offsite-online-daring"
                />
                <label htmlFor="offsite-online-daring">
                  Online
                </label>
              </div>
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
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Syarat dan Ketentuan</h2>
            <AddSk skValue={(data) => setSkValue(data)} />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Benefit</h2>
            <AddBenefit benefitValue={(data) => setBenefitValue(data)} />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Alur</h2>
            <AddAlur alurValue={(data) => setAlurValue(data)} />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">FAQ</h2>
            <AddFaq faqValue={(data) => setFaqValue(data)} />
          </div>

          <Button title={"Daftarkan Event"} onClick={handleSubmitClick} />
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
