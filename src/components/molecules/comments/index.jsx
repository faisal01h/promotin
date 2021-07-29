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

function Comments({itemId, comments, user, componentState, reloadComponent}) {

  const HOST_URI = process.env.HOST_URI || '//promotin.herokuapp.com'
  const [ sendInProgress, setSendInProgress ] = useState(false)
  const [ commentMsg, setCommentMsg ] = useState();

  const commentInput = useRef();
  let map = new Map();

  useEffect(() => {
    //console.log(new Date(comments[0].createdAt).getTime() - new Date(comments[comments.length-1].createdAt).getTime())
    if(comments.length > 1 && (new Date(comments[0].createdAt).getTime() - new Date(comments[1].createdAt).getTime()) < 0) {
      console.log('sort')
      comments.reverse()
    } else console.log('in place')
      
  }, [])

  function getUserNameById (id) {
    return ( axios.get(HOST_URI+'/api/v1/auth/user/find?_id='+id)
      .then((e) => {
        map.set(id, e.data.data.name)
        return e.data.data.name;
      })
      .catch((err) => {
        console.error(err)
        return false;
      })
    )
  }

  

  function submitComment() {
    if(commentInput.current.value.length < 3) {
      setCommentMsg('Komentar terlalu pendek!')
      return
    }

    setSendInProgress(true)
    setCommentMsg(undefined);
    axios.post(HOST_URI+'/api/v1/items/view/'+itemId+'/comment', {
      comment: commentInput.current.value
    })
    .then(resp => {
      setSendInProgress(false)
      commentInput.current.value = ''
      setCommentMsg('Berhasil mengirim komentar!')
      reloadComponent(!componentState)
    })
    .catch(err  => {
      setSendInProgress(false)
      setCommentMsg('Gagal mengirim komentar!')
    })
  }

  return (
    <div className="comments-container">
      <div className="c-head">
        <span className="c-count">{comments.length}</span>
        <h3 className="c-title">Komentar</h3>
      </div>

      <Line width={100} />
      {
        user ?
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
              style={{fontFamily: 'sans-serif'}}
              ref={commentInput}
            ></textarea>
            {
              sendInProgress ?
                <Loading color="#333" />
              : <button className="add-comment" onClick={submitComment}>Tambahkan Komentar</button>
            }
            {
              commentMsg ? commentMsg : ""
            }
          </div>
        </div>
        :
        <div className="comments-not-loggedin" onClick={() => window.location.href="/login"}>
          <a>Login untuk memberi komentar</a>
        </div>
      }

      <div className="all-comments">
        { comments.length > 0 ?
          comments.map((e) => {
            
            getUserNameById(e.userId)
            return (
              <div>
                <div className="comment main-comment" key={e.id}>
                  {/* <img src="" alt="user-image" /> */}
                  <div className="user-image"></div>

                  <div className="comment-content">
                    <p className="username">{ map.get(e.userId) }</p>
                    <p className="comment-body">
                      {e.comment}
                    </p>
                    <div className="status-comment">
                      <div className="up">
                        <span>{ e.upvotes.length }</span>
                        <Icon icon={chevronUp} className="vote" />
                      </div>

                      <span>|</span>

                      <div className="down">
                        <span>{ e.downvotes.length }</span>
                        <Icon icon={chevronDown} className="vote" />
                      </div>

                      <div className="reply">
                        <Icon icon={circleFill} className="dot" />
                        <span>reply</span>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  e.child.length > 0 ?
                  <div>
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
                  </div>
                  : ""
                }
              </div>
            )
          })
        : ""
        }

        

        <Line width={100} />
      </div>
    </div>
  );
}

export default Comments;
