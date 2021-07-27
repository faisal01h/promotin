import React from "react";
import "./ItemDetail.scss";
import { poster } from "../../assets";
import { Icon, InlineIcon } from "@iconify/react";
import calendarWeekFill from "@iconify/icons-bi/calendar-week-fill";
import circleFill from "@iconify/icons-bi/circle-fill";
import filePaper2Fill from "@iconify/icons-ri/file-paper-2-fill";
import { Comments, Line } from "../../components";

function ItemDetai() {
  return (
    <div className="id-container">
      <div className="id-wrapper">
        <img src={poster} alt="poster" className="poster" />
        <div className="content-wrapper">
          <h1 className="id-title">Lomba Poster</h1>
          <div className="id-tag">
            <Icon icon={circleFill} className="c-f" />
            <a href="#">lomba</a>
            <Icon icon={circleFill} className="c-f" />
            <a href="#">Digital Art</a>
          </div>

          <Line width={100} />

          <h3 className="tgl-pelaksanaan">
            <Icon icon={calendarWeekFill} /> Tanggal Pelaksanaan
          </h3>
          <div className="tgl-pel-detail">
            <div className="dari">
              <p className="ket">Dari</p>
              <p className="ket-det">3 Agustus 2021</p>
            </div>

            <div className="sampai">
              <p className="ket">Sampai</p>
              <p className="ket-det">18 Agustus 2021</p>
            </div>
          </div>

          <h3 className="detail-event">
            <Icon icon={filePaper2Fill} /> Detail Event
          </h3>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
            aspernatur culpa, non expedita deserunt ad nulla corporis beatae
            minus assumenda, est nobis inventore accusamus aperiam? Voluptatibus
            voluptates iure tempore neque.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            dolore non optio eaque rem. Sint veniam nisi in quaerat asperiores
            architecto. Vel sed molestias minima sapiente beatae quas provident
            incidunt?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
            esse consequatur aut enim, quasi delectus quisquam ratione sapiente
            aspernatur itaque. Aliquam, placeat veniam! Nam aperiam saepe, quas
            at soluta facere?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            tempora distinctio obcaecati fugiat voluptatem. Aut quibusdam fugit
            dolorem possimus voluptatem quia laborum numquam similique deserunt
            ab, maxime rerum atque aspernatur.
          </p>
          <button className="add-fav">Tambahkan ke Favorit</button>
        </div>
      </div>

      <div className="comment">
        <Comments />
      </div>
    </div>
  );
}

export default ItemDetai;
