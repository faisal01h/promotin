import React from 'react';
import './login.scss';

const Login = () => {
    
    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="form-title">
                    <h1>Masuk</h1>
                </div>
                <div class="inner-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="input-form" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Kata sandi</label>
                        <input type="password" name="password" className="input-form" />
                    </div>
                    <div className="form-options">
                        <button name="loginBtn" class="btn">Masuk</button>
                        <a href="#">Lupa kata sandi?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;