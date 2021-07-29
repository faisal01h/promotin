import React, { useEffect } from "react";
import "./MyEvent.scss";
import { poster } from "../../assets";
import { Button, Loading } from "../../components/atoms";
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";
import AuthenticationService from "../auth";

function MyEvent() {
  const history = useHistory();
  const [myevent, setMyevent] = useState([]);

  function deleteEvent(id) {
    axios.put("//promotin.herokuapp.com/api/v1/items/unlist/"+id, {

    }).then(console.log)
  }

  useEffect(() => {
    if(!AuthenticationService.getCurrentUser()) {
      window.location.href = "/login"
    }

    let user = AuthenticationService.getCurrentUser().data.id
    axios
      .post("//promotin.herokuapp.com/api/v1/items/all/filter", {
        authorId: user,
      })
      .then((result) => {
        if (result) {
          const responseAPI = result.data;

          setMyevent(responseAPI.data);
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);

  return (
    <div className="myevent-wrapper">
      <h1 className="title">Event Saya</h1>
      {
        myevent.length > 0 ?
          myevent.map((event) => {
            return (
              <div className="myevent-item" key={event._id}>
                <img src={poster} alt="" className="poster-img" />
                <div className="detail-item">
                  <h1 className="poster-title">{event.title}</h1>
                  <div className="detail">
                    <p>Tingkat : {event.tingkatan}</p>
                    <p>Daerah : {event.daerah}</p>
                    <p>Tanggal : {event.tanggal}</p>
                    <p>Jenis : {event.jenis}</p>
                  </div>
                  <div className="btn-wrapper">
                    <Button
                      title={"Edit"}
                      onClick={() => history.push(`/edit/${event._id}`)}
                    />
                    <Button
                      title={"Hapus"}
                      style={{ backgroundColor: "#ee1443" }}
                      onClick={() => deleteEvent(event.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        :
          <Loading color="#333" />
      }

      <Button
        title={"Create New Event"}
        addClass="create-event"
        onClick={() => history.push("/create-event")}
      />
    </div>
  );
}

export default MyEvent;
