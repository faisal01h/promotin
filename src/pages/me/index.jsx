import React from "react";
import "./me.scss";
import { poster, user } from "../../assets";
import { Gap, Button, Loading, LoadingBox } from "../../components";
import { useState } from "react";
import { render } from "react-dom";
import auth from "../auth";
import data from "@iconify/icons-bi/chevron-up";
import axios from 'axios';
import { Link } from "react-router-dom";


const Me = () => {
  const HOST_URI = process.env.REACT_APP_HOST_URI
  const [me, setMe] = useState(true);
  const [edit, setEdit] = useState("");
  const [detail, setDetail] = useState({});
  const [myevent, setMyevent] = useState([]);
  const [removeInProgress, setRemoveInProgress] = useState(false);

  useState(() => {
    const u = auth.getCurrentUser() || undefined;
    if(u) {
      setDetail({
        id: auth.getLocalCurrentuser().data.id,
        name: auth.getLocalCurrentuser().data.name,
        email: auth.getLocalCurrentuser().data.email
      })
    }

    axios
      .post(HOST_URI+"/api/v1/items/all/filter", {
        authorId: auth.getLocalCurrentuser().data.id,
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
  }, [])

  return (
    <div className="me-container">
      <div className="user">
        <div className="u-i">
          <img src={user} alt="" className="user-img" />
          {me ? <span className="edit">Ubah</span> : ""}
        </div>
        <div className="user-info">
          <h1>
            {detail.name+" "}
            {me ? (
              <span className="edit" onClick={() => setEdit("name")}>
                Ubah
              </span>
            ) : (
              ""
            )}
          </h1>
          <p>{detail.email}</p>
        </div>
      </div>

      <Gap height={25} />

      <div className="bio">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
          totam itaque! Minus iusto ea delectus, amet eos ab nemo sequi rerum,
          id quibusdam consequuntur fugiat, aliquam provident. Ducimus, est
          excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, aspernatur totam corporis eligendi, suscipit similique
          tempore nesciunt nemo illo enim, rerum quisquam culpa. Corrupti eos
          architecto unde molestiae amet temporibus!
        </p>
        {me ? <span className="edit">Edit</span> : ""}
      </div>

      <Gap height={20} />

      <div className="poster">
        <div className="poster-t">
          <h2>Poster saya</h2>
          <span>11</span>
        </div>

        <Gap height={10} />
        <div className="me-myevent">
        {
          myevent.length > 0 ?
          myevent.map((event) => {
            return (
              <Link className="me-poster-wrap" key={event._id} to={"/item-detail/"+event._id}>
                <img src={poster} alt="" className="poster-img" />
              </Link>
            );
          })
          :
          <Loading color="#333" />
        }
        </div>
      </div>
    </div>
  );
};

export default Me;
