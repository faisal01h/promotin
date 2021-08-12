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
import LoadingBox from "../loadingBox";

function Comments({ itemId, user, componentState, reloadComponent }) {
  const HOST_URI = process.env.HOST_URI || "//promotin-front.herokuapp.com";
  const [sendInProgress, setSendInProgress] = useState(false);
  const [commentMsg, setCommentMsg] = useState();
  const [nameMap, setNameMap] = useState(new Map());
  const [comments, setComments] = useState([]);

  const commentInput = useRef();

  function fetchComments() {
    axios.get(HOST_URI+"/api/v1/items/view/"+itemId+"/comments")
    .then((response) => {
      console.log(response.data.data)
      setComments(response.data.data)
      reloadComponent(!componentState)
    })
    .catch(console.error)
  }

  function fetchName(e) {
    console.log(nameMap.get(e.userId))

    if(!nameMap.get(e.userId)) {
      axios
      .get(HOST_URI + "/api/v1/auth/user/find?_id=" + e.userId)
      .then((res) => {
        
        setNameMap(nameMap.set(e.userId, res.data.data.name))
      })
      .catch((err) => {
        console.error(err);
      });
    }
    
    
  }

  useEffect(() => {
    fetchComments()
  }, [nameMap])

  useEffect(() => {
    comments.map((e, i) => {
      fetchName(e)
    });
  }, [comments]);



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
        fetchComments()
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
        .then(e => {
          fetchComments()
        })
        .catch(console.error);
    }
  }

  function upvoteMainComment(commentId) {
    if (Auth.getCurrentUser()) {
      axios
        .post(
          HOST_URI + "/api/v1/items/view/" + itemId + "/comment/" + commentId + "/upvote",
          {}
        )
        .then(e => {
          fetchComments()
        })
        .catch(e => {
          console.error(e)
        });
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
          ? comments.map((e) => {
              return (
                <div key={e.commentId}>
                  <div className="comment main-comment">
                    {/* <img src="" alt="user-image" /> */}
                    <div className="user-image"></div>

                    <div className="comment-content">
                      <p className="username">{nameMap.get(e.userId) ? nameMap.get(e.userId) : <LoadingBox height="15px" width="50px" />}</p>
                      <p className="comment-body">{e.comment}</p>
                      <div className="status-comment">
                        <div className="up">
                          <span>{e.upvotes.length}</span>
                          <Icon icon={chevronUp} className="vote" onClick={()=>{upvoteMainComment(e.commentId)}} />
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
