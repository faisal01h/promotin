import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import AuthenticationService from "../auth";
import { Button, Line } from "../../components/atoms";

const Login = () => {
  const emailInput = useRef();
  const passInput = useRef();
  const history = useHistory();

  function sendLoginData() {
    AuthenticationService.signin(
      emailInput.current.value,
      passInput.current.value
    ).then(e=> {
      window.location.href = "/"
    }).catch(e=>{
      console.log("Wrong credentials")
    })
    
  }

  if (AuthenticationService.getCurrentUser()) {
    history.push("/");
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-view">
        <div className="random-pic"></div>
        <div className="lv-text">
          <h1>PromotBox</h1>
          <Line width={100} />
          <p>Tempat promosi event, lomba, dan seminar</p>
        </div>
      </div>

      <div className="login-card">
        <div>
          <div className="form-title">
            <h1>Masuk</h1>
          </div>
          <div className="inner-form email">
            <div className="form-group">
              {/* <i className="fas fa-envelope"></i> */}
              <label htmlFor="email">Email</label>
              <input
                ref={emailInput}
                type="email"
                name="email"
                className="input-form"
                placeholder="Email"
              />
            </div>
            <div className="form-group password">
              {/* <i className="fas fa-key"></i> */}
              <label htmlFor="password">Password</label>
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
              <p>
                Belum punya akun?{" "}
                <a href="/register" className="buat-akun">
                  Buat akun
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
