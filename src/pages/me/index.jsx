import React from "react";
import "./me.scss";
import { poster, user } from "../../assets";
import { Gap } from "../../components";
import { useState } from "react";
import { render } from "react-dom";

const Me = () => {
  const [me, setMe] = useState(true);
  const [edit, setEdit] = useState("");

  return (
    <div className="me-container">
      <div className="user">
        <div className="u-i">
          <img src={user} alt="" className="user-img" />
          {me ? <span className="edit">Ubah</span> : ""}
        </div>
        <div className="user-info">
          <h1>
            Fahrizal{" "}
            {me ? (
              <span className="edit" onClick={() => setEdit("name")}>
                Ubah
              </span>
            ) : (
              ""
            )}
          </h1>
          <p>fahrizalm84@gmail.com</p>
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
        <img src={poster} alt="" className="poster-img" />
      </div>
    </div>
  );
};

export default Me;
