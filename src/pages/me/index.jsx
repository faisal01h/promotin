import React, { useEffect } from 'react'
import axios from 'axios'
import Auth from "../auth"
import './me.scss'
import { Line, Gap, Button } from '../../components/atoms'

const Me = () => {

    useEffect(() => {
        axios.post("//promotin.herokuapp.com/api/v1/auth/user/find", {
            _id: Auth.getCurrentUser().data.id
        })
        .then(console.log)
        .catch(console.error)
    }, [])

    return (
        <div className="me-wrapper">
            <h1>Akun Saya</h1>

            <div className="left">
                <h2>Keamanan Akun</h2>
                <Line width="100" />
                <div className="me-item-wrapper">
                    <div className="flex">
                        <b className="me-item-title">Password</b>
                        <Button 
                        title="Ubah password"
                        addClass="chpass-btn"
                        onClick={() => window.location.href = '/resetpassword'}
                        />
                    </div>

                    <Gap height="1rem" />

                    
                    <div className="flex">
                        <div className="me-item-title">
                            <b>2FA</b>
                            
                        </div>
                        <Button 
                        title="Aktifkan"
                        addClass="chpass-btn"
                        onClick={() => {return}}
                        />
                    </div>
                    <p>Two Factor Authentication (2FA) atau Otentikasi Ganda memastikan keamanan akun anda dengan mengirimkan kode token
                        ke email anda setiap kali anda mencoba untuk masuk ke akun anda.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Me;