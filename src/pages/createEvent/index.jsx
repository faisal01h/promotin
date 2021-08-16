import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Blank_img } from "../../assets";
import { Daerah, Kategori, Jenis, Tingkatan } from "../../data";
import { Button, Line, Dropdown, InputDesc, Loading } from "../../components/";
import Auth from "../auth";
import "./createEvent.scss";

function CreateEvent() {
  const HOST_URI = process.env.REACT_APP_HOST_URI || "//promotin.herokuapp.com"

  const [previewImg, setPreviewImg] = useState(Blank_img);
  const [tglPelaksanaan, setTglPelaksanaan] = useState(undefined);
  const [provinsiValue, setProvinsiValue] = useState([]);
  const [kabKotValue, setKabKotValue] = useState([]);
  const [kategoriValue, setKategoriValue] = useState("");
  const [jenisValue, setJenisValue] = useState("");
  const [tingkatanValue, setTingkatanValue] = useState("");
  const [jenisPelaksanaanValue, setJenisPelaksanaanValue] = useState("");
  const [deskripsiValue, setDeskripsiValue] = useState("");
  const [tglPel, setTglPel] = useState(["", ""]);
  const [error, setError] = useState([]);
  const [first, setFirst] = useState(true);

  const [submitInProgress, setSubmitInProgress] = useState(false);

  const [form, setForm] = useState({
    title: "",
    pelaksanaan: "",
    tanggal: [],
    kategori: "",
    provinsi: "",
    kabkot: "",
    daerah: "",
    tingkatan: "",
    jenis: "",
    description: "",
  });

  useEffect(() => {
    if(!Auth.getCurrentUser()) {
      window.location.href = "/login"
    }
  })

  useEffect(() => {
    setForm({
      ...form,
      tanggal: tglPel,
      kategori: kategoriValue,
      provinsi: provinsiValue,
      kabkot: kabKotValue,
      daerah: kabKotValue+', '+provinsiValue,
      jenis: jenisValue,
      tingkatan: tingkatanValue,
      pelaksanaan: jenisPelaksanaanValue,
      description: deskripsiValue,
    });
  }, [
    tglPel,
    kategoriValue,
    provinsiValue,
    kabKotValue,
    jenisValue,
    tingkatanValue,
    jenisPelaksanaanValue,
    deskripsiValue,
  ]);


  useEffect(() => {
    setTglPel(["", ""]);
  }, [tglPelaksanaan]);

  function submitPoster(itemId) {
    let formdata = new FormData();
    let img = document.querySelector('input[type="file"]').files[0];
    formdata.append("itemId", itemId);
    formdata.append("image", img);

    axios
      .post(HOST_URI+"/api/v1/items/new/image", formdata)
      .then((result) => {
        console.log(result);
        setSubmitInProgress(false);
        window.location.href = "/item-detail/" + itemId;
      })
      .catch(er => {
        console.error(er)
      })
  }

  function handleSubmitClick() {
    console.log(form, error);
    // console.log(form.tanggal[0] === "");
    setError([]);
    setFirst(false);
    isEmpty(form);

    console.log(first);
    if (!error.length > 0) {
      setSubmitInProgress(true);
      axios
        .post(HOST_URI+"/api/v1/items/new", form)
        .then((result) => {
          console.log(result)
          submitPoster(result.data.data.itemId);
        })
        .catch((er) => {
          console.error(er)
        });
    }
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
    if (!obj.title) setError((error) => [...error].concat("title"));

    if (!obj.pelaksanaan) setError((error) => [...error].concat("pelaksanaan"));

    if (!obj.kategori) setError((error) => [...error].concat("kategori"));

    if (!obj.tingkatan) setError((error) => [...error].concat("tingkatan"));

    if (!obj.jenis) setError((error) => [...error].concat("jenis"));

    if (!obj.description.length || obj.description.length < 10)
      setError((error) => [...error].concat("deskripsi"));

    if (!obj.provinsi.length > 0)
      setError((error) => [...error].concat("provinsi"));

    if (!obj.kabkot.length > 0)
      setError((error) => [...error].concat("kabkot"));

    // console.log(obj.tanggal);
    if (obj.tanggal[0] === "") {
      setError((error) => [...error].concat("tanggal sehari"));
    }

    if (tglPelaksanaan === "lebih dari sehari") {
      if (obj.tanggal[1] === "") {
        setError((error) => [...error].concat("tanggal lebih"));
      }

      if (obj.tanggal[0] > obj.tanggal[1]) {
        setError((error) =>
          [...error].concat("Tanggal tidak valid (dari > sampai)")
        );
      }
    }

    //console.log(obj.tanggal)
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
    const arr = [...tglPel];

    if (name === "0") {
      arr[0] = value;
    } else if (name === "1") {
      arr[1] = value;
    }

    setTglPel(arr);
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
      <h1 className="title">Buat Event Baru</h1>
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
                onChange={handleChange}
                placeholder="Seminar IT"
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
              <label htmlFor="jenis">Jenis</label>
              <Dropdown
                title={"Pelaksanaan Event"}
                items={Jenis}
                onChange={() => {}}
                dropdownValue={(data) => {
                  setJenisValue(data);
                }}
              />
            </div>

            
            <div
            className={`form-input tanggal ${
              checkError("tanggal sehari") ? "error" : ""
            } ${checkError("tanggal lebih") ? "error" : ""} ${
              checkError("Tanggal tidak valid (dari > sampai)") ? "error" : ""
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
            {
              tglPelaksanaan ? (
              tglPelaksanaan === "sehari" ? (
                <div className="tgl">
                  <input
                    type="date"
                    name="0"
                    id="tanggal"
                    onChange={handleTglChange}
                  />
                </div>
              ) : (
                <div className="tgl">
                  <div className="tgl-detail">
                    <label htmlFor="dari">Dari</label>
                    <input
                      type="date"
                      name="0"
                      id="tanggal"
                      onChange={handleTglChange}
                    />
                  </div>

                  <div className="tgl-detail">
                    <label htmlFor="sampai">Sampai</label>
                    <input
                      type="date"
                      name="1"
                      id="tanggal"
                      onChange={handleTglChange}
                    />
                  </div>
                </div>
              )
            )
            : ""
            }
            </div>

            <div
              className={`form-input kategori ${
                checkError("kategori") ? "error" : ""
              }`}
            >
              <label htmlFor="kategori">Kategori</label>
              <Dropdown
                title={"Kategori"}
                items={Kategori}
                onChange={() => {}}
                dropdownValue={(data) => {
                  setKategoriValue(data);
                }}
              />
            </div>

            <div className="form-tempat">
              <div
                className={`form-input provinsi ${
                  checkError("provinsi") ? "error" : ""
                }`}
              >
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

              {
                provinsiValue.length > 0 ?
                <div
                className={`form-input kab-kot ${
                  checkError("kabkot") ? "error" : ""
                }`}
              >
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
                : ""
              }
            </div>

            <div
              className={`form-input tingkatan ${
                checkError("tingkatan") ? "error" : ""
              }`}
            >
              <label htmlFor="tingkatan">Tingkatan</label>
              <Dropdown
                title={"Tingkatan"}
                items={Tingkatan}
                onChange={() => {}}
                dropdownValue={(data) => {
                  setTingkatanValue(data);
                }}
              />
            </div>

            <div
              className={`form-input jenis ${
                checkError("pelaksanaan") ? "error" : ""
              }`}
            >
              <label htmlFor="pelaksanaan">Pelaksanaan</label>
              <Dropdown
                title={"Pelaksanaan Event"}
                items={[
                  { id: 1, value: "On Site/Offline" },
                  { id: 2, value: "Online" },
                ]}
                onChange={() => {}}
                dropdownValue={(data) => {
                  setJenisPelaksanaanValue(data);
                }}
              />
            </div>

            <div
              className={`form-input deskripsi ${
                checkError("deskripsi") ? "error" : ""
              }`}
            >
              <label htmlFor="deskripsi">Deskripsi</label>
              <InputDesc deskripsiValue={(data) => setDeskripsiValue(data)} />
            </div>
          </div>

          {
            submitInProgress ? <Button title={<Loading />} />
            : <Button title={"Daftarkan Event"} onClick={handleSubmitClick} />
          }
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
