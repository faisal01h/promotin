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
  const [provinsiValue, setProvinsiValue] = useState([]);
  const [kabKotValue, setKabKotValue] = useState([]);

  const provinsi = [
    {
      id: 1,
      value: "jawa timur",
    },
    {
      id: 2,
      value: "bali",
    },
  ];

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    provinsi: [],
    kabkot: [],
    alamat: "",
    tingkatan: "",
    jenis: "",
    deskripsi: "",
    sk: [],
    benefit: [],
    alur: [],
    faq: [],
  });

  useEffect(() => {
    setForm({
      ...form,
      provinsi: provinsiValue,
      kabkot: kabKotValue,
      sk: skValue,
      benefit: benefitValue,
      alur: alurValue,
      faq: faqValue,
    });
  }, [provinsiValue, kabKotValue, skValue, benefitValue, alurValue, faqValue]);

  useEffect(() => {
    console.log(provinsiValue);
  }, [provinsiValue]);

  function submitPoster(itemId) {
    let formData = new formData();
    let img = document.querySelector('input[type="file"]').files[0];
    formData.append("itemId", itemId);
    formData.append("image", img);

    axios
      .post("//promotin.herokuapp.com/api/v1/items/new/image", formData)
      .then((result) => {});
  }

  function handleSubmitClick() {
    console.log(form);
    // axios
    //   .post("//promotin.herokuapp.com/api/v1/items/new", {})
    //   .then((result) => {
    //     console.log(result);
    //     submitPoster();
    //   });
  }

  const handleChange = (e) => {
    const target = e.target;
    // console.log(target.value);
    // console.log(target.name);
    const value = target.name === "sebuahtest" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  function handleImagePreview(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="create-event-wrapper">
      <h1 className="title">Create Event</h1>
      <Line width={100} />

      <div className="form-wrapper">
        <div className="form-inner">
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
                onChange={handleChange}
                placeholder="Seminar IT"
              />
            </div>
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Detail Event</h2>

            <div className="form-input tanggal">
              <label htmlFor="tanggal">Tanggal Pelaksanaan</label>
              <input
                type="date"
                name="tanggal"
                id="tanggal"
                onChange={handleChange}
              />
            </div>

            <div className="form-tempat">
              <div className="form-input provinsi">
                <label htmlFor="provinsi">Provinsi</label>
                <Dropdown
                  title={"Provinsi"}
                  items={provinsi}
                  onChange={console.log("ganti")}
                  provinsiValue={(data) => setProvinsiValue(data)}
                  // <AddSk skValue={(data) => setSkValue(data)} />
                />
              </div>

              <div className="form-input kab-kot">
                <label htmlFor="kab-kot">Kabupaten/Kota</label>

                <Dropdown title={"Kabupaten/Kota"} />
              </div>
            </div>

            <div className="form-input alamat">
              <label htmlFor="alamat">Alamat Event</label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                onChange={handleChange}
              />
            </div>

            <div className="form-input tingkatan">
              <p>Tingkatan</p>
              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="sd-smp-sma-k"
                  value="sd-smp-sma-k"
                  onChange={handleChange}
                />
                <label htmlFor="sd-smp-sma-k">SD/SMP/SMA/K</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="perguruan-tinggi"
                  value="perguruan-tinggi"
                  onChange={handleChange}
                />
                <label htmlFor="perguruan-tinggi">Perguruan Tinggi</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="umum"
                  value="umum"
                  onChange={handleChange}
                />
                <label htmlFor="umum">Umum</label>
              </div>
            </div>

            <div className="form-input jenis">
              <p>Jenis</p>

              <div className="radio-option">
                <input
                  type="radio"
                  name="jenis"
                  id="onsite-offline"
                  value="onsite-offline"
                  onChange={handleChange}
                />
                <label htmlFor="onsite-offline">On Site/Offline</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="jenis"
                  id="online"
                  value="online"
                  onChange={handleChange}
                />
                <label htmlFor="online">Online</label>
              </div>
            </div>

            <div className="form-input deskripsi">
              <label htmlFor="deskripsi">Deskripsi</label>
              <textarea
                name="deskripsi"
                id="deskripsi"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Syarat dan Ketentuan</h2>
            <AddSk skValue={(data) => setSkValue(data)} />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Benefit (optional)</h2>
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
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
