import React from "react";
import "./comments.scss";
import { Icon, InlineIcon } from "@iconify/react";
import chevronUp from "@iconify/icons-bi/chevron-up";
import chevronDown from "@iconify/icons-bi/chevron-down";
import circleFill from "@iconify/icons-bi/circle-fill";
import { Line } from "../../../components";

function Comments() {
  return (
    <div className="comments-container">
      <div className="c-head">
        <span className="c-count">17</span>
        <h3 className="c-title">Comments</h3>
      </div>

      <Line width={100} />
      <div className="add-comments">
        {/* <img src="" alt="user-image" /> */}
        <div className="user-image"></div>

        <div className="comment-input">
          <p>komentar sebagai user 1</p>
          <textarea
            name="comment"
            id=""
            cols="30"
            rows="8"
            placeholder="tulis komentar"
            style={{fontFamily: 'sans-serif'}}
          ></textarea>
          <button className="add-comment">Tambahkan Komentar</button>
        </div>
      </div>

      <div className="all-comments">
        <div className="comment main-comment">
          {/* <img src="" alt="user-image" /> */}
          <div className="user-image"></div>

          <div className="comment-content">
            <p className="username">User 1</p>
            <p className="comment-body">
              Apakah mungkin akan ada penambahan kuota?
            </p>
            <div className="status-comment">
              <div className="up">
                <span>3</span>
                <Icon icon={chevronUp} className="vote" />
              </div>

              <span>|</span>

              <div className="down">
                <span>0</span>
                <Icon icon={chevronDown} className="vote" />
              </div>

              <div className="reply">
                <Icon icon={circleFill} className="dot" />
                <span>reply</span>
              </div>
            </div>
          </div>
        </div>

        <Line width={100} />

        <div className="comment reply-comment">
          {/* <img src="" alt="user-image" /> */}
          <div className="user-image"></div>
          <div className="comment-content">
            <p className="username">
              User 2 <span>@user1</span>
            </p>
            <p className="comment-body">
              Apakah mungkin akan ada penambahan kuota?
            </p>
            <div className="status-comment">
              <div className="up">
                <span>3</span>
                <Icon icon={chevronUp} className="vote" />
              </div>

              <span>|</span>

              <div className="down">
                <span>0</span>
                <Icon icon={chevronDown} className="vote" />
              </div>

              <div className="reply">
                <Icon icon={circleFill} className="dot" />
                <span>reply</span>
              </div>
            </div>
          </div>
        </div>

        <Line width={100} />
      </div>
    </div>
  );
}

export default Comments;
