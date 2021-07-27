import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Blank_img } from "../../assets";
import { Daerah, Kategori, Jenis, Tingkatan } from "../../daerah";
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Line, Dropdown } from "../../components/";
import "./createEvent.scss";

function CreateEvent() {
  const [previewImg, setPreviewImg] = useState(Blank_img);
  const [tglPelaksanaan, setTglPelaksanaan] = useState("sehari");
  const [provinsiValue, setProvinsiValue] = useState([]);
  const [kabKotValue, setKabKotValue] = useState([]);
  const [kategoriValue, setKategoriValue] = useState();
  const [jenisValue, setJenisValue] = useState();
  const [tingkatanValue, setTingkatanValue] = useState();
  const [jenisPelaksanaanValue, setJenisPelaksanaanValue] = useState();
  const [error, setError] = useState([]);
  const [first, setFirst] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
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

  function submitPoster(itemId) {
    let formdata = new FormData();
    let img = document.querySelector('input[type="file"]').files[0];
    formdata.append("itemId", itemId);
    formdata.append("image", img);
    console.log(formdata);

    axios
      .post("//promotin.herokuapp.com/api/v1/items/new/image", formdata)
      .then((result) => {
        console.log(result);
        window.location.href = "/item-detail/" + itemId;
      });
  }

  function handleSubmitClick() {
    console.log(form, error);
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

  const highlighter = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter className="codeblock" style={theme} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  function renderPreview(e) {
    if(e.target.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.target.value)
    } else {
      setIsPreview(false)
    }
  }

  function isEmpty(obj) {
    if (!obj.title) setError((error) => [...error].concat("title"));

    if (!obj.pelaksanaan) setError((error) => [...error].concat("pelaksanaan"));

    if (!obj.kategori) setError((error) => [...error].concat("kategori"));

    if (!obj.tingkatan) setError((error) => [...error].concat("tingkatan"));

    if (!obj.jenis) setError((error) => [...error].concat("jenis"));

    if (!obj.deskripsi.length || obj.deskripsi.length < 10) setError((error) => [...error].concat("deskripsi"));

    if (!obj.provinsi.length > 0)
      setError((error) => [...error].concat("provinsi"));

    if (!obj.kabkot.length > 0)
      setError((error) => [...error].concat("kabkot"));

    if (obj.tanggal.dari === "") {
      console.log(obj.tanggal.dari === "");
      setError((error) => [...error].concat("tanggal sehari"));
    }

    if ( (obj.tanggal.dari === "" && obj.tanggal.sampai === "") || (obj.tanggal.sampai === "" && tglPelaksanaan !== "sehari") ) {
      console.log((obj.tanggal.dari === "" && obj.tanggal.sampai === "") || (obj.tanggal.sampai === "" && tglPelaksanaan !== "sehari"));
      setError((error) => [...error].concat("tanggal lebih"));
    }

    //console.log(obj.tanggal)
    if(obj.tanggal.dari > obj.tanggal.sampai) {
      setError((error) => [...error].concat("Tanggal tidak valid (dari > sampai)"))
    }
      
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
                } ${
                  checkError("tanggal lebih") ? "error" : ""
                } ${
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

            {tglPelaksanaan === "sehari" ? (
              
                

                <div className="tgl">
                  <input
                    type="date"
                    name="dari"
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
              
            )}
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
              <Button
                title="B"
                onClick={() => {
                  
                }}
              />
              <textarea
                name="deskripsi"
                id="deskripsi"
                cols="30"
                rows="10"
                onChange={(e) => {handleChange(e); renderPreview(e);}}
              ></textarea>
              {
                isPreview ?
                <div style={{textAlign: 'left'}}>
                  Pratinjau
                  <div className="form-input">
                    <Markdown components={highlighter} children={previewContent} />
                  </div>
                </div>
                : ""
              }
            </div>
          </div>

          <Button title={"Daftarkan Event"} onClick={handleSubmitClick} />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
