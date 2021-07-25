import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthenticationService from '../auth'
import { Button } from '../../components/atoms'
import axios from 'axios'

const ResetPassword = () => {

    const [ email, setEmail ] = useState();
    const [ token, setToken ] = useState();
    const [ password, setPassword ] = useState();
    const [ stage, setStage ] = useState(undefined);
    const history = useHistory();

    function handleSubmit() {
        console.log(email,token,password,stage)
        if(stage === undefined) {
            axios.post("//promotin.herokuapp.com/api/v1/auth/passwordreset", {
                email: email
            })
            .then(response => {
                setStage(1);
            }).catch(console.error)
            
        } else if(stage === 1) {
            axios.post("//promotin.herokuapp.com/api/v1/auth/passwordreset/reset", {
                email: email,
                token: token,
                password: password
            })
            .then((resp) => {
                window.location.href ="/login"
            })
        }
    }

    if (AuthenticationService.getCurrentUser()) {
        console.log("Already logged in");
        history.push('/');
    } else console.log("require log in");

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="form-title">
                <h1>Reset Password</h1>
                </div>
                <div className="inner-form email">
                    {
                        stage === undefined ?
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input
                            type="email"
                            name="email"
                            className="input-form"
                            placeholder="Email"
                            onChange={(value) => setEmail(value.target.value)}
                            />
                        </div>
                        :
                        <div>
                            <div className="form-group">
                                <i className="fas fa-envelope"></i>
                                <input
                                type="text"
                                name="token"
                                className="input-form"
                                placeholder="Token"
                                onChange={(value) => setToken(value.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <i className="fas fa-envelope"></i>
                                <input
                                type="password"
                                name="password"
                                className="input-form"
                                placeholder="Password baru"
                                onChange={(value) => setPassword(value.target.value)}
                                />
                            </div>
                        </div>
                    }
                    <div className="form-options">
                        <Button title={"Reset"} onClick={handleSubmit} />
                        <a href="/register" className="buat-akun">
                        Buat akun
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;