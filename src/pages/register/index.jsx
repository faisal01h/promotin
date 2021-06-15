import React from "react";
import { Button } from "../../components";
import "./register.scss";

const Register = () => {
  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <div className="form-title">
          <h1>Daftar</h1>
        </div>
        <div class="inner-form email">
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              className="input-form"
              placeholder="Input your email address"
            />
          </div>
          <div className="form-group password">
            {/* <label htmlFor="password">Kata sandi</label> */}
            <i class="fas fa-key"></i>
            <input
              type="password"
              name="password"
              className="input-form"
              placeholder="Input new password"
            />
          </div>
          <div className="form-group password">
            {/* <label htmlFor="password">Kata sandi</label> */}
            <i class="fas fa-key"></i>
            <input
              type="password"
              name="password"
              className="input-form"
              placeholder="Input your new password again"
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
              <label htmlFor="snk">Setuju dengan syarat dan ketentuan</label>
            </div>
            <Button title={"Daftar"} />
            <div className="login">
              <p>Sudah punya akun? </p>
              <a href="/login" className="buat-akun">
                masuk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
