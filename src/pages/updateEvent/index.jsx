import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Blank_img } from "../../assets";
import { Daerah, Jenis, Kategori, Tingkatan } from "../../data";
import { InputDesc } from "../../components";

import { Button, Line, Dropdown, Loading } from "../../components";
import "./updateEvent.scss";
import { useParams } from "react-router-dom";

function CreateEvent() {
  const HOST_URI = process.env.HOST_URI || '//promotin.herokuapp.com'
  const { id } = useParams();

  const [previewImg, setPreviewImg] = useState(Blank_img);
  const [tglPelaksanaan, setTglPelaksanaan] = useState("sehari");
  const [provinsiValue, setProvinsiValue] = useState([]);
  const [kabKotValue, setKabKotValue] = useState([]);
  const [kategoriValue, setKategoriValue] = useState();
  const [jenisValue, setJenisValue] = useState();
  const [tingkatanValue, setTingkatanValue] = useState();
  const [jenisPelaksanaanValue, setJenisPelaksanaanValue] = useState();
  const [deskripsiValue, setDeskripsiValue] = useState();
  const [error, setError] = useState([]);
  const [first, setFirst] = useState(true);
  const [detail, setDetail] = useState();

  const [tglPel, setTglPel] = useState({
    dari: "",
    sampai: "",
  });

  const [form, setForm] = useState({
    title: "",
    pelaksanaan: "",
    tanggal: "",
    kategori: "",
    provinsi: "",
    kabkot: "",
    tingkatan: "",
    jenis: "",
    deskripsi: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      tanggal: tglPel,
      kategori: kategoriValue,
      provinsi: provinsiValue,
      kabkot: kabKotValue,
      jenis: jenisValue,
      tingkatan: tingkatanValue,
      pelaksanaan: jenisPelaksanaanValue,
    });
  }, [
    tglPel,
    kategoriValue,
    provinsiValue,
    kabKotValue,
    jenisValue,
    tingkatanValue,
    jenisPelaksanaanValue,
  ]);

  useEffect(() => {
    setTglPel({
      dari: "",
      sampai: "",
    });
  }, [tglPelaksanaan]);

  useEffect(() => {
    if (!first) {
      setError([]);

      console.log("notfirst");
      console.log(form);
      isEmpty(form);
    }
  }, [first, form]);

  function handleSubmitClick() {
    console.log(form);
    setError([]);
    setFirst(false);
    isEmpty(form);
    // axios
    //   .post("//promotin.herokuapp.com/api/v1/items/new", form)
    //   .then((result) => {
    //     console.log(result);
    //     submitPoster(result.data.data.itemId);
    //   })
    //   .catch(console.log);
  }

  function checkError(err) {
    let errorResult;

    if (error.length > 0) {
      error.map((item, i) => {
        if (err === item) {
          errorResult = "true";
        }
      });
    }

    if (errorResult === "true") return true;

    return false;
  }

  function isEmpty(obj) {
    if (!obj.deskripsi) setError((error) => [...error].concat("deskripsi"));

    if (obj.tanggal.dari === "") {
      console.log(obj.tanggal.dari === "");
      setError((error) => [...error].concat("tanggal sehari"));
    }

    if (obj.tanggal.dari === "" && obj.tanggal.sampai === "")
      console.log(obj.tanggal.dari === "" && obj.tanggal.sampai === "");
    setError((error) => [...error].concat("tanggal lebih"));
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

  const handleTglChange = (e) => {
    const target = e.target;
    const value = target.name === "sebuahtest" ? target.checked : target.value;
    const name = target.name;

    setTglPel({
      ...tglPel,
      [name]: value,
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

  useEffect(() => {
    axios.get(HOST_URI+"/api/v1/items/view/"+id)
    .then((response) => {
      setDetail(response.data.data)
      console.log(detail)
    })
    .catch(console.error)
  }, [])

  return (
    <div className="create-event-wrapper">
      <h1 className="title">Edit Event</h1>
      <Line width={100} />

      <div className="form-wrapper">
        <div className="form-inner">
          <div className="f-wp">
            <div
              className={`form-input judul ${
                checkError("title") ? "error" : ""
              }`}
            >
              <label htmlFor="judul">Judul Event</label>
              <input
                type="text"
                name="title"
                id="title"
                value={detail ? detail.title : ""}
                disabled
              />
            </div>
          </div>

          <div className="f-wp">
            <h2 className="sub-title">Detail Event</h2>

            <div
              className={`form-input jenis ${
                checkError("jenis") ? "error" : ""
              }`}
            >
              <label>Jenis</label>
              <p>{detail ? detail.jenis : <Loading color="#333" />}</p>
            </div>

            {tglPelaksanaan === "sehari" ? (
              <div
                className={`form-input tanggal ${
                  checkError("tanggal sehari") ? "error" : ""
                }`}
              >
                <label htmlFor="tanggal">Tanggal Pelaksanaan</label>
                <Dropdown
                  title={"Pelaksanaan Event"}
                  items={[
                    { id: 1, value: "sehari" },
                    { id: 2, value: "lebih dari sehari" },
                  ]}
                  onChange={() => {}}
                  dropdownValue={(data) => {
                    setTglPelaksanaan(data);
                  }}
                />

                <div className="tgl">
                  <input
                    type="date"
                    name="dari"
                    id="tanggal"
                    onChange={handleTglChange}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`form-input tanggal ${
                  checkError("tanggal lebih") ? "error" : ""
                }`}
              >
                <label htmlFor="tanggal">Tanggal Pelaksanaan</label>
                <Dropdown
                  title={"Pelaksanaan Event"}
                  items={[
                    { id: 1, value: "sehari" },
                    { id: 2, value: "lebih dari sehari" },
                  ]}
                  onChange={() => {}}
                  dropdownValue={(data) => {
                    setTglPelaksanaan(data);
                  }}
                />
                <div className="tgl">
                  <div className="tgl-detail">
                    <label htmlFor="dari">Dari</label>
                    <input
                      type="date"
                      name="dari"
                      id="tanggal"
                      onChange={handleTglChange}
                    />
                  </div>

                  <div className="tgl-detail">
                    <label htmlFor="sampai">Sampai</label>
                    <input
                      type="date"
                      name="sampai"
                      id="tanggal"
                      onChange={handleTglChange}
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              className={`form-input kategori ${
                checkError("kategori") ? "error" : ""
              }`}
            >
              <label>Kategori</label>
              <p>{detail?detail.kategori:""}</p>
            </div>

            <div className="form-tempat">
              <div
                className={`form-input provinsi ${
                  checkError("provinsi") ? "error" : ""
                }`}
              >
                <label htmlFor="provinsi">Provinsi</label>
                <p>{detail? detail.provinsi:""}
                </p>
              </div>

              <div
                className={`form-input kab-kot ${
                  checkError("kabkot") ? "error" : ""
                }`}
              >
                <label htmlFor="kab-kot">Kabupaten/Kota</label>

                <p>{detail? detail.kabkot:""}
                </p>
              </div>
            </div>

            <div
              className={`form-input tingkatan ${
                checkError("tingkatan") ? "error" : ""
              }`}
            >
              <label htmlFor="tingkatan">Tingkatan</label>
              <p>{detail? detail.tingkatan:""}
                </p>
            </div>

            <div
              className={`form-input jenis ${
                checkError("pelaksanaan") ? "error" : ""
              }`}
            >
              <label htmlFor="pelaksanaan">Pelaksanaan</label>
              <p>{detail? detail.pelaksanaan:""}</p>
            </div>

            <div
              className={`form-input deskripsi ${
                checkError("deskripsi") ? "error" : ""
              }`}
            >
              <label htmlFor="deskripsi">Deskripsi</label>
              <InputDesc deskripsiValue={(data) => setDeskripsiValue(data)} initialValue={detail?detail.description:""} />
            </div>
          </div>

          <Button title={"Simpan Perubahan"} onClick={handleSubmitClick} />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
