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
  const [refreshList, setRefreshList] = useState(false);
  const [removeInProgress, setRemoveInProgress] = useState(false);

  const HOST_URI = process.env.HOST_URI || '//localhost:5000'

  function deleteEvent(id) {
    setRemoveInProgress(true)
    axios.put(HOST_URI+"/api/v1/items/unlist/"+id, {

    }).then(response => {
      setRefreshList(!refreshList);
      setRemoveInProgress(false)
    })
    .catch(console.error)
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
  }, [refreshList]);

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
                    <p>Tanggal : {event.tanggal[1] != "" ? <span>{event.tanggal[0]+' sampai '+event.tanggal[1]}</span>:event.tanggal[0]}</p>
                    <p>Jenis : {event.jenis}</p>
                  </div>
                  <div className="btn-wrapper">
                    <Button
                      title={"Edit"}
                      onClick={() => history.push(`/edit/${event._id}`)}
                    />
                    {
                      removeInProgress ?
                      <Button
                        title={'Menghapus...'}
                        style={{ backgroundColor: "#ee1443" }}
                      />
                      :
                      <Button
                        title={"Hapus"}
                        style={{ backgroundColor: "#ee1443" }}
                        onClick={() => deleteEvent(event._id)}
                      />
                    }
                  </div>
                </div>
              </div>
            );
          })
        :
          <Loading color="#333" />
      }
      <div className="ce-btn-wrap">
        <Button
          title={"Buat Event Baru"}
          addClass="create-event"
          onClick={() => history.push("/create-event")}
        />
      </div>
      
    </div>
  );
}

export default MyEvent;
