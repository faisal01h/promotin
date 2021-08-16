import React, { useRef, useState, useEffect } from "react";
import { Button, Line } from "../../components";
import "./register.scss";
import AuthenticationService from "../auth";

function Register() {
  const nameInput = useRef();
  const emailInput = useRef();
  const passInput = useRef();
  const confirmPassInput = useRef();
  const snk = useRef();

  const [pwdMismatch, setPwdMismatch] = useState(false);
  const [disagreement, setDisagreement] = useState(false);
  const [pwdTooShort, setPwdTooShort] = useState(false);

  function toggleCheckbox() {
    if (snk.current.value == "1") snk.current.value = "0";
    else snk.current.value = "1";
  }

  function handleOnClick() {
    if (snk.current.value == "1") {
      setDisagreement(false);
      if (passInput.current.value === confirmPassInput.current.value) {
        setPwdMismatch(false);
        if (passInput.current.value.length >= 8) {
          setPwdTooShort(false);
          AuthenticationService.register(
            nameInput.current.value,
            emailInput.current.value,
            passInput.current.value
          );
        } else setPwdTooShort(true);
      } else setPwdMismatch(true);
    } else setDisagreement(true);
  }

  return (
    <div className="register-page-wrapper">
      <div className="register-view">
        <div className="random-pic"></div>
        <div className="lv-text">
          <h1>PromotBox</h1>
          <Line width={100} />
          <p>Tempat promosi event, lomba, dan seminar</p>
        </div>
      </div>

      <div className="register-card">
        <div>
          <div className="form-title">
            <h1>Daftar</h1>
          </div>
          <div className="inner-form name">
            <div className="form-group">
              <label htmlFor="email">Nama</label>
              <input
                type="text"
                name="name"
                className="input-form"
                placeholder="Nama lengkap"
                ref={nameInput}
              />
            </div>
          </div>
          <div className="inner-form email">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="input-form"
                placeholder="Email"
                ref={emailInput}
              />
            </div>
            <div className="form-group password">
              <label htmlFor="password">Kata sandi</label>
              <input
                type="password"
                name="password"
                className="input-form"
                placeholder="Password"
                ref={passInput}
              />
            </div>
            {pwdTooShort ? (
              <div className="form-error">
                <p>Panjang password minimal 8 karakter!</p>
              </div>
            ) : (
              ""
            )}
            <div className="form-group password">
              <label htmlFor="password">Konfirmasi Kata sandi</label>
              <input
                type="password"
                name="password"
                className="input-form"
                placeholder="Konfirmasi password"
                ref={confirmPassInput}
              />
            </div>
            {pwdMismatch ? (
              <div className="form-error">
                <p>
                  Isi kolom password harus sama dengan kolom konfirmasi
                  password!
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="form-options">
              <div className="snk">
                <input
                  type="checkbox"
                  name="snk"
                  id="snk"
                  onChange={toggleCheckbox}
                  ref={snk}
                />
                <label htmlFor="snk">
                  Saya setuju dengan <a>syarat dan ketentuan</a> serta{" "}
                  <a>kebijakan privasi</a> PromotBox.
                </label>
              </div>
              {disagreement ? (
                <div className="form-error">
                  <p>
                    Untuk mendaftar, anda harus setuju dengan syarat dan
                    ketentuan serta kebijakan privasi PromotBox!
                  </p>
                </div>
              ) : (
                ""
              )}
              <Button title={"Daftar"} onClick={handleOnClick} />
              <div className="login">
                <p>Sudah punya akun? &nbsp;</p>
                <a href="/login" className="buat-akun">
                  Masuk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
