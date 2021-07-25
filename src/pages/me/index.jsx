import React, { useEffect } from 'react'
import axios from 'axios'
import Auth from "../auth"

const Me = () => {

    useEffect(() => {
        axios.post("//promotin.herokuapp.com/api/v1/auth/user/find", {
            _id: Auth.getCurrentUser().data.id
        })
        .then(console.log)
        .catch(console.error)
    }, [])

    return (
        <div>
            <h1>Akun Saya</h1>
        </div>
    )
}

export default Me;