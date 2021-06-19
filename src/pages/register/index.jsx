import React, { useRef } from "react";
import { Button } from "../../components";
import "./register.scss";
import AuthenticationService from "../auth";

function Register() {

  const nameInput = useRef();
  const emailInput = useRef();
  const passInput = useRef();
  const confirmPassInput = useRef();

  function handleOnClick() {
    if(passInput.current.value === confirmPassInput.current.value) {
      AuthenticationService.register(
        nameInput.current.value,
        emailInput.current.value,
        passInput.current.value
      )
    }
  }

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <div className="form-title">
          <h1>Daftar</h1>
        </div>
        <div className="inner-form name">
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <i class="fas fa-user"></i>
            <input
              type="text"
              name="name"
              className="input-form"
              placeholder="Enter your full name"
              ref={nameInput}
            />
          </div>
        </div>
        <div class="inner-form email">
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              className="input-form"
              placeholder="Enter your email address"
              ref={emailInput}
            />
          </div>
          <div className="form-group password">
            {/* <label htmlFor="password">Kata sandi</label> */}
            <i class="fas fa-key"></i>
            <input
              type="password"
              name="password"
              className="input-form"
              placeholder="Enter new password"
              ref={passInput}
            />
          </div>
          <div className="form-group password">
            {/* <label htmlFor="password">Kata sandi</label> */}
            <i class="fas fa-key"></i>
            <input
              type="password"
              name="password"
              className="input-form"
              placeholder="Confirm password"
              ref={confirmPassInput}
            />
          </div>
          <div className="form-options">
            <div className="snk">
              <input
                type="checkbox"
                name="snk"
                id="snk"
                value="Setuju dengan syarat dan ketentuan"
              />
              <label htmlFor="snk">Saya setuju dengan <a>syarat dan ketentuan</a></label>
            </div>
            <Button 
              title={"Daftar"} 
              onClick={handleOnClick}
            />
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
  );
};

export default Register;
