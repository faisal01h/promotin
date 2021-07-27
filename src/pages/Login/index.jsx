import React, { useRef } from "react";
import { useHistory } from 'react-router-dom'
import "./login.scss";
import AuthenticationService from "../auth";
import { Button } from "../../components/atoms";

const Login = () => {
  const emailInput = useRef();
  const passInput = useRef();
  const history = useHistory();

  function sendLoginData() {
    console.log("attempting to login...");
    AuthenticationService.signin(
      emailInput.current.value,
      passInput.current.value
    );
  }

  if (AuthenticationService.getCurrentUser()) {
    history.push('/');
  }


  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="form-title">
          <h1>Masuk</h1>
        </div>
        <div className="inner-form email">
          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input
              ref={emailInput}
              type="email"
              name="email"
              className="input-form"
              placeholder="Email"
            />
          </div>
          <div className="form-group password">
            <i className="fas fa-key"></i>
            <input
              ref={passInput}
              type="password"
              name="password"
              className="input-form"
              placeholder="Password"
            />
          </div>
          <div className="form-options">
            <a href="/resetpassword" className="lupa-sandi">
              Lupa kata sandi?
            </a>
            <Button title={"Masuk"} onClick={sendLoginData} />
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
