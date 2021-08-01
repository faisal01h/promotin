import React, { useEffect, useRef, useState } from "react";
import "./comments.scss";
import { Icon, InlineIcon } from "@iconify/react";
import chevronUp from "@iconify/icons-bi/chevron-up";
import chevronDown from "@iconify/icons-bi/chevron-down";
import circleFill from "@iconify/icons-bi/circle-fill";
import { Line } from "../../../components";
import axios from "axios";
import data from "@iconify/icons-bi/chevron-up";
import { Loading } from "../../atoms";
import Auth from "../../../pages/auth";

function Comments({ itemId, comments, user, componentState, reloadComponent }) {
  const HOST_URI = process.env.HOST_URI || "//promotin.herokuapp.com";
  const [sendInProgress, setSendInProgress] = useState(false);
  const [commentMsg, setCommentMsg] = useState();
  const [reversed, setReversed] = useState([]);
  const [owner, setOwner] = useState([]);

  const commentInput = useRef();
  let map = new Map();

  useEffect(() => {
    //console.log(new Date(comments[0].createdAt).getTime() - new Date(comments[comments.length-1].createdAt).getTime())
    if (
      comments.length > 1 &&
      new Date(comments[0].createdAt).getTime() -
        new Date(comments[1].createdAt).getTime() <
        0
    ) {
      console.log("sort");
      console.log(comments);
      setReversed(comments.reverse());
    } else console.log("in place");
  }, [comments]);

  useEffect(() => {
    // reversed.map((e) => console.log(getUserNameById(e.userId)));
    console.log(reversed);
    reversed.map((e, i) => {
      console.log(e.userId);

      axios
        .get(HOST_URI + "/api/v1/auth/user/find?_id=" + e.userId)
        .then((e) => {
          console.log(e.data.data._id, e.data.data.name);
          setOwner((old) => [e.data.data.name, ...old]);
          // setReversed((reversed) => [...reversed, e.data.data.name]);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [reversed]);

  useEffect(() => {
    console.log(reversed);
    // setReversed({
    //   ...reversed,
    //   username: owner,
    // });
  }, [owner]);

  function getUserNameById(id) {
    axios
      .get(HOST_URI + "/api/v1/auth/user/find?_id=" + id)
      .then((e) => {
        console.log(e.data.data.name);
        setOwner((old) => [...old, e.data.data.name]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function submitComment() {
    if (commentInput.current.value.length < 3) {
      setCommentMsg("Komentar terlalu pendek!");
      return;
    }

    setSendInProgress(true);
    setCommentMsg(undefined);
    axios
      .post(HOST_URI + "/api/v1/items/view/" + itemId + "/comment", {
        comment: commentInput.current.value,
      })
      .then((resp) => {
        setSendInProgress(false);
        commentInput.current.value = "";
        setCommentMsg("Berhasil mengirim komentar!");
        reloadComponent(!componentState);
      })
      .catch((err) => {
        setSendInProgress(false);
        setCommentMsg("Gagal mengirim komentar!");
      });
  }

  function submitReply(e, commentId, mention) {
    if (e.length > 0 && Auth.getCurrentUser()) {
      axios
        .post(
          HOST_URI + "/api/v1/items/view/" + itemId + "/comment/" + commentId,
          {
            comment: e,
            repliesTo: mention || "",
          }
        )
        .then(console.log)
        .catch(console.error);
    }
  }

  function upvoteMainComment(commentId) {
    if (Auth.getCurrentUser()) {
      axios
        .post(
          HOST_URI + "/api/v1/items/view/" + itemId + "/comment/" + commentId,
          {}
        )
        .then(console.log)
        .catch(console.error);
    }
  }

  return (
    <div className="comments-container">
      <div className="c-head">
        <span className="c-count">{comments.length}</span>
        <h3 className="c-title">Komentar</h3>
      </div>

      <Line width={100} />
      {user ? (
        <div className="add-comments">
          {/* <img src="" alt="user-image" /> */}
          <div className="user-image"></div>

          <div className="comment-input">
            <p>Beri komentar sebagai {user.name}</p>
            <textarea
              name="comment"
              id=""
              cols="30"
              rows="8"
              placeholder="Tulis komentar"
              style={{ fontFamily: "sans-serif" }}
              ref={commentInput}
            ></textarea>
            {sendInProgress ? (
              <Loading color="#333" />
            ) : (
              <button className="add-comment" onClick={submitComment}>
                Tambahkan Komentar
              </button>
            )}
            {commentMsg ? commentMsg : ""}
          </div>
        </div>
      ) : (
        <div
          className="comments-not-loggedin"
          onClick={() => (window.location.href = "/login")}
        >
          <a>Login untuk memberi komentar</a>
        </div>
      )}

      <div className="all-comments">
        {comments.length > 0
          ? reversed.map((e, i) => {
              // getUserNameById(e.userId);
              // let tes = getUserNameById(e.userId);
              // console.log(map.get("162756604901160bdb71ee6412523bc96dbf6"));
              return (
                <div>
                  <div className="comment main-comment" key={e.id}>
                    {/* <img src="" alt="user-image" /> */}
                    <div className="user-image"></div>

                    <div className="comment-content">
                      <p className="username">{owner[i]}</p>
                      <p className="comment-body">{e.comment}</p>
                      <div className="status-comment">
                        <div className="up">
                          <span>{e.upvotes.length}</span>
                          <Icon icon={chevronUp} className="vote" />
                        </div>

                        <span>|</span>

                        <div className="down">
                          <span>{e.downvotes.length}</span>
                          <Icon icon={chevronDown} className="vote" />
                        </div>

                        <div className="reply">
                          <Icon icon={circleFill} className="dot" />
                          <span>reply</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {e.child.length > 0
                    ? e.child.map((el) => {
                        return (
                          <div>
                            <Line width={100} />

                            <div className="comment reply-comment">
                              {/* <img src="" alt="user-image" /> */}
                              <div className="user-image"></div>
                              <div className="comment-content">
                                <p className="username">
                                  {el.userId} <span>@user1</span>
                                </p>
                                <p className="comment-body">{el.comment}</p>
                                <div className="status-comment">
                                  <div className="up">
                                    <span>
                                      {el.upvotes ? el.upvotes.length : 0}
                                    </span>
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
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            })
          : ""}

        <Line width={100} />
      </div>
    </div>
  );
}

export default Comments;
