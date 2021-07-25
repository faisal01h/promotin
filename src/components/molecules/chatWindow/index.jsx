import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./chatWindow.scss";
import { Button } from "../..";
import AuthenticationService from "../../../pages/auth";

//const socket = io("//localhost:5000")

const chatWindow = (target_id) => {

  const [ chatContent, setChatContent ] = useState([]);
  const [ chatTarget, setChatTarget ] = useState({});
  
  const socket = io("//localhost:5000")

  useEffect(() => {

    socket.on("connect", data => {
        socket.emit("join", AuthenticationService.getCurrentUser())
    })

    axios.get("//localhost:5000/api/v1/chats/"+target_id)
    .then(response => {
      console.log(response);
      setChatTarget(target_id);
      setChatContent(response.data);
    })

  }, [])

  return (
    <div>
      <div className="cw-wrapper">
        <div className="chat-header">
          {
            chatTarget.id ?
              <b>chatTarget.name</b>
            : ""
          }
        </div>
        <div className="chat-body">
          {
            chatContent.length > 0 ?
              chatContent.map((e) => {
                if(e.id === AuthenticationService.getCurrentUser().data.id) {
                  // my chat bubble
                } else {
                  // 
                }
              })
            : <p>Tidak ada riwayat obrolan</p>
          }
        </div>
      </div>
    </div>
  )
};

export default chatWindow;
