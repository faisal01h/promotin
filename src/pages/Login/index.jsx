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
                <div className="inner-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="input-form" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Kata sandi</label>
                        <input type="password" name="password" className="input-form" />
                    </div>
                    <div className="form-options">
                        <Button 
                            title={"Masuk"}
                            onClick={sendLoginData}
                        />
                        <a href="#">Lupa kata sandi?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;