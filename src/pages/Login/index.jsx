import React, { useState } from 'react';
import './login.scss';
import AuthenticationService from '../auth';
import { Button } from '../../components/atoms';

function sendLoginData() {
    console.log("attempting to login...");
    AuthenticationService.signin("test", "yes");
}

if(AuthenticationService.getCurrentUser()) {
    console.log("Already logged in");
    // redirect jal
}
else console.log("require log in");

//TODO: Button onclick, panggil AuthenticationService.signin

const Login = () => {

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="form-title">
                    <h1>Masuk</h1>
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
              placeholder="Input your password"
            />
          </div>
          <div className="form-options">
            <a href="#" className="lupa-sandi">
              Lupa kata sandi?
            </a>
            <Button title={"Masuk"} />
            <a href="/register" className="buat-akun">
              Buat akun
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
