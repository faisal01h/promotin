import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Blank_img } from "../../assets";
import { Daerah } from "../../daerah";

import {
  Button,
  Line,
  Dropdown,
  AddBenefit,
  AddSk,
  AddAlur,
  AddFaq,
} from "../../components";
import "./updateEvent.scss";

function CreateEvent() {
  const [previewImg, setPreviewImg] = useState(Blank_img);
  const [skValue, setSkValue] = useState([]);
  const [benefitValue, setBenefitValue] = useState([]);
  const [alurValue, setAlurValue] = useState([]);
  const [faqValue, setFaqValue] = useState([]);
  const [provinsiValue, setProvinsiValue] = useState([]);
  const [kabKotValue, setKabKotValue] = useState([]);
  const { id } = useParams();

  const [oldData, setOldData] = useState({
    sk: [],
    benefits: [],
    alur: [],
    faq: [],
  });

  const [form, setForm] = useState({
    title: "",
    daerah: "",
    description: {
      desc: "",
      benefits: [],
      alur: [],
      faq: [],
      tag: "",
      sk: [],
      tanggal: "",
      alamat: "",
    },
    tingkatan: "",
    jenis: "",
  });

  useEffect(() => {
    axios
      .get("//promotin.herokuapp.com/api/v1/items/view/" + id)
      .then((result) => {
        if (result) {
          let getData = result.data.data;

          setForm({
            ...form,
            title: getData.title,
            daerah: getData.daerah,
            description: getData.description,
            tingkatan: getData.tingkatan,
            jenis: getData.jenis,
          });

          setOldData({
            ...oldData,
            sk: getData.description.sk,
            benefits: getData.description.benefits,
            alur: getData.description.alur,
            faq: getData.description.faq,
          });
        }
      });
  }, [id]);

  useEffect(() => {
    setForm({
      ...form,
      daerah: kabKotValue + ", " + provinsiValue,
      description: {
        sk: skValue,
        benefits: benefitValue,
        alur: alurValue,
        faq: faqValue,
      },
    });
  }, [provinsiValue, kabKotValue, skValue, benefitValue, alurValue, faqValue]);

  function submitPoster(itemId) {
    let formdata = new FormData();
    let img = document.querySelector('input[type="file"]').files[0];
    formdata.append("itemId", itemId);
    formdata.append("image", img);
    console.log(formdata);

    axios
      .post("//promotin.herokuapp.com/api/v1/items/edit/image/" + id, formdata)
      .then((result) => {
        console.log(result);
      });
  }

  function handleSubmitClick() {
    console.log(form);
    axios
      .put("//promotin.herokuapp.com/api/v1/items/view/" + id, form)
      .then((result) => {
        console.log(result);
        submitPoster(result.data.data.itemId);
      })
      .catch(console.log);
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === "sebuahtest" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleInDescChange = (e) => {
    const target = e.target;
    const value = target.name === "sebuahtest" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      description: {
        [name]: value,
      },
    });
  };

  function handleProvinsiChange(data) {
    if (provinsiValue.length > 0)
      return Daerah.filter((e) => {
        if (e.value === data) {
          return e.data;
        }
      });
    else
      return [
        {
          id: 0,
          value: "-",
          data: [{ id: 0, value: "" }],
        },
      ];
  }

  function handleImagePreview(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="create-event-wrapper">
      <h1 className="title">Edit Event {form.title}</h1>
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
                name="title"
                id="title"
                onChange={handleChange}
                value={form.title}
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
                onChange={handleInDescChange}
              />
            </div>

            <div className="form-tempat">
              <div className="form-input provinsi">
                <label htmlFor="provinsi">Provinsi</label>
                <Dropdown
                  title={"Provinsi"}
                  items={Daerah}
                  onChange={() => {
                    console.log("ganti provinsi " + provinsiValue);
                  }}
                  dropdownValue={(data) => {
                    setProvinsiValue(data);
                    handleProvinsiChange(data);
                  }}
                />
              </div>

              <div className="form-input kab-kot">
                <label htmlFor="kab-kot">Kabupaten/Kota</label>

                <Dropdown
                  title={"Kabupaten/Kota"}
                  items={handleProvinsiChange(provinsiValue)[0].data}
                  onChange={() => {
                    console.log("ganti kabkot " + kabKotValue);
                  }}
                  dropdownValue={(data) => setKabKotValue(data)}
                />
              </div>
            </div>

            <div className="form-input alamat">
              <label htmlFor="alamat">Alamat Event</label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                onChange={handleInDescChange}
                value={form.daerah}
              />
            </div>

            <div className="form-input tingkatan">
              <p>Tingkatan</p>
              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="sd"
                  value="SD"
                  onChange={handleChange}
                />
                <label htmlFor="sd">SD</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="smp"
                  value="SMP"
                  onChange={handleChange}
                />
                <label htmlFor="smp">SMP</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  name="tingkatan"
                  id="sma"
                  value="SMA/K"
                  onChange={handleChange}
                />
                <label htmlFor="sma">SMA/K</label>
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
                  value="Umum"
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
                name="desc"
                id="deskripsi"
                cols="30"
                rows="10"
                onChange={handleInDescChange}
                value={form.description.desc}
              ></textarea>
            </div>
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Syarat dan Ketentuan</h2>
            <AddSk
              skValue={(data) => setSkValue(data)}
              updateValue={oldData.sk}
            />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Benefit (optional)</h2>
            <AddBenefit
              benefitValue={(data) => setBenefitValue(data)}
              updateValue={oldData.benefits}
            />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Alur</h2>
            <AddAlur
              alurValue={(data) => setAlurValue(data)}
              updateValue={oldData.alur}
            />
          </div>

          <div className="f-wp">
            <h2 className="sub-title">FAQ</h2>
            <AddFaq
              faqValue={(data) => setFaqValue(data)}
              updateValue={oldData.faq}
            />
          </div>

          <Button title={"Daftarkan Event"} onClick={handleSubmitClick} />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
