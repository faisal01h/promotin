import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthenticationService from '../auth'
import { Button, Loading } from '../../components/atoms'
import axios from 'axios'
import '../Login/login.scss'

const ResetPassword = () => {

    const [ email, setEmail ] = useState();
    const [ token, setToken ] = useState();
    const [ password, setPassword ] = useState();
    const [ stage, setStage ] = useState(undefined);
    const [ loadState, setLoadState ] = useState(true);
    const [ loadStateString, setLoadStateString ] = useState('Memproses data...');
    const history = useHistory();

    const HOST_URI = process.env.REACT_APP_HOST_URI || "//promotin.herokuapp.com"

    function handleSubmit() {
        console.log(email,token,password,stage)
        setLoadState(true)
        if(stage === undefined) {
            axios.post(HOST_URI + "/api/v1/auth/passwordreset", {
                email: email
            })
            .then(response => {
                setLoadState(false)
                setStage(1);
            }).catch(er => {
                console.error(er)
                setLoadStateString('Terjadi kesalahan!')
            })
            
        } else if(stage === 1) {
            axios.post(HOST_URI+"/api/v1/auth/passwordreset/reset", {
                email: email,
                token: token,
                password: password
            })
            .then((resp) => {
                window.location.href ="/login"
            }).catch(er => {
                console.error(er)
                setLoadStateString('Terjadi kesalahan!')
            })
        }
    }

    useEffect(() => {
        function set() {
            return Promise.resolve(setEmail(AuthenticationService.getCurrentUser().data.email))
        }
        if (AuthenticationService.getCurrentUser()) {
            
            set().then(e => {
                if(email) handleSubmit()
            })
        } else {
            setLoadState(false)
        }
    }, [email])

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="form-title">
                <h1>Reset Password</h1>
                </div>
                {
                    loadState === false ?
                    <div className="inner-form email">
                        {
                        stage === undefined ?
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input
                            type="email"
                            name="email"
                            className="input-form"
                            placeholder="Email"
                            onChange={(value) => setEmail(value.target.value)}
                            required
                            />
                        </div>
                        :
                        <div>
                            <div className="form-group form-info">
                                <i className="fas fa-info text-white"></i>
                                <p className="text-white">Silahkan periksa kotak masuk email anda.</p>
                            </div>
                            <div className="form-group">
                                <i className="fas fa-key"></i>
                                <input
                                type="text"
                                name="token"
                                className="input-form"
                                placeholder="Token"
                                onChange={(value) => setToken(value.target.value)}
                                required
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
                : <div>
                    <Loading color="#333" />
                    <p>{loadStateString}</p>
                    <a href={"/resetpassword"} style={{color: 'blue'}}>Coba lagi?</a>
                </div>
                }
            </div>
        </div>
    )
}

export default ResetPassword;