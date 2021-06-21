import React from "react";
import io from "socket.io-client";
import "./chatWindow.scss";
import { Button } from "../..";
import AuthenticationService from "../../../pages/auth";

//const socket = io("//localhost:5000")

const chatWindow = () => {
  /*
    const joinRoom = () => {
        socket.on("connect", data => {
            socket.emit("join", AuthenticationService.getCurrentUser())
        })
    }*/
  return <div></div>;
};

export default chatWindow;
