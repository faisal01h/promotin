import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { poster } from "../../assets";
import { Icon, InlineIcon } from "@iconify/react";
import calendarWeekFill from "@iconify/icons-bi/calendar-week-fill";
import circleFill from "@iconify/icons-bi/circle-fill";
import filePaper2Fill from "@iconify/icons-ri/file-paper-2-fill";
import { Comments, Line, Loading, LoadingBox } from "../../components";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthenticationService from "../auth";
import { Month, Day } from "../../data";

function ItemDetail() {
  const HOST_URI = process.env.REACT_APP_HOST_URI || "//promotin.herokuapp.com";
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [favIsLoading, setFavIsLoading] = useState(false);
  const [stringifiedDate, setStringifiedDate] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [reloadComment, setReloadComment] = useState(false);
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);
  const [reconnect, setReconnect] = useState(false);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          className="codeblock"
          style={theme}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  useEffect(() => {
    axios
      .get(HOST_URI + "/api/v1/items/view/" + id + "/comments")
      .then((response) => {
        setComments(response.data.data);
      })
      .catch(console.error);
  }, [reloadComment]);

  useEffect(() => {
    // Get event data
    axios
      .get(HOST_URI + "/api/v1/items/view/" + id)
      .then((response) => {
        setData(response.data.data);
        setComments(response.data.data.comment);

        let date = [
          new Date(response.data.data.tanggal[0]),
          new Date(response.data.data.tanggal[1]),
        ];
        setStringifiedDate([
          date[0].getDate() +
            " " +
            Month[date[0].getMonth()] +
            " " +
            date[0].getFullYear(),
          date[1].getDate() +
            " " +
            Month[date[1].getMonth()] +
            " " +
            date[1].getFullYear(),
        ]);
      })
      .then((e) => {
        setIsConnectionFailed(false);
        setIsLoaded(true);
        setIsLiked(false);
      })
      .catch((e) => {
        setIsConnectionFailed(true);
        setReconnect(!reconnect);
      });

    // Get favorite data
    if (AuthenticationService.getCurrentUser()) {
      axios.get(HOST_URI + "/api/v1/event/fav").then((result) => {
        result.data.data.filter((e) => {
          if (e === id) setIsLiked(true);
        });
      });
    }
  }, [reconnect]);

  useEffect(() => {
    // Get author data
    if (data) {
      axios
        .get(HOST_URI + "/api/v1/auth/user/find?_id=" + data.authorId)
        .then((res) => {
          setAuthor(res.data.data.name);
        });
    }
  }, [data]);

  function handleFavClick() {
    setFavIsLoading(true);
    if (AuthenticationService.getCurrentUser() && isLiked === false) {
      axios
        .post(HOST_URI + "/api/v1/event/fav", {
          itemId: id,
        })
        .then((result) => {
          setIsLiked(true);
          setFavIsLoading(false);
        });
    } else if (AuthenticationService.getCurrentUser() && isLiked === true) {
      axios
        .post(HOST_URI + "/api/v1/event/fav", {
          itemId: id,
        })
        .then((result) => {
          setIsLiked(false);
          setFavIsLoading(false);
        });
    } else window.location.href = "/login";
  }

  function viewCount() {
    if (!data) return false;
    let count;
    if (data.view < 20) return false;
    else if (data.view > 19 && data.view < 100) {
      count = "puluhan";
    } else if (data.view > 99 && data.view < 1000) {
      count = "ratusan";
    } else if (data.view > 999 && data.view < 10000) {
      count = "ribuan";
    } else if (data.view > 9999 && data.view < 100000) {
      count = "lebih dari " + data.view / 10000 + "0 ribu";
    } else {
      count = "banyak";
    }

    return "Dilihat " + count + " kali";
  }

  return (
    <div className="id-container">
      {isConnectionFailed ? (
        <div className="alert-connection-failed">
          <p>Koneksi terputus. Menghubungkan ke server...</p>
        </div>
      ) : (
        ""
      )}
      <div className="id-wrapper">
        <img src={poster} alt="poster" className="poster" />
        <div className="content-wrapper">
          <h1 className="id-title">
            {isLoaded ? (
              data.title
            ) : (
              <LoadingBox height="25px" width="350px" borderRadius="1000px" />
            )}
          </h1>
          <div className="id-tag">
            <Icon icon={circleFill} className="c-f" />
            {isLoaded ? (
              <a href="#">{data.jenis} </a>
            ) : (
              <LoadingBox
                height="15px"
                width="75px"
                margin="3px 10px 0 0"
                borderRadius="1000px"
              />
            )}
            <Icon icon={circleFill} className="c-f" />
            {isLoaded ? (
              <a href="#">{data.kategori} </a>
            ) : (
              <LoadingBox
                height="15px"
                width="75px"
                margin="3px 10px 0 0"
                borderRadius="1000px"
              />
            )}

            {isLoaded && author ? (
              <div className="id-author">
                <a href="#">{author}</a>
              </div>
            ) : (
              <LoadingBox
                height="15px"
                width="75px"
                margin="3px 10px 0 0"
                borderRadius="1000px"
              />
            )}
          </div>
          <div className="viewcount">
            {/*
            viewCount() !== false ? viewCount() : ""
          */}
          </div>

          <Line width={100} />

          <h3 className="tgl-pelaksanaan">
            <Icon icon={calendarWeekFill} /> Tanggal Pelaksanaan
          </h3>
          <div className="tgl-pel-detail">
            {isLoaded ? (
              data.tanggal.length == 2 && data.tanggal[1] !== "" ? (
                <div>
                  <div className="dari">
                    <p className="ket">Dari</p>
                    <p className="ket-det">
                      {stringifiedDate ? stringifiedDate[0] : ""}
                    </p>
                  </div>

                  <div className="sampai">
                    <p className="ket">Sampai</p>
                    <p className="ket-det">
                      {stringifiedDate ? stringifiedDate[1] : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="dari">
                  <p className="ket-det">
                    {stringifiedDate ? stringifiedDate[0] : ""}
                  </p>
                </div>
              )
            ) : (
              <LoadingBox height="20px" width="250px" borderRadius="1000px" />
            )}
          </div>

          <h3 className="detail-event">
            <Icon icon={filePaper2Fill} /> Detail Event
          </h3>

          <section className="description-wrapper" style={{ width: "100%" }}>
            {isLoaded ? (
              <Markdown
                className="md-content"
                disallowedElements={["img", "media", "script"]}
                remarkPlugins={[gfm]}
                children={data.description}
                components={components}
              />
            ) : (
              //data.description
              <div style={{ marginBottom: "150px" }}>
                <LoadingBox
                  height="15px"
                  width="370px"
                  borderRadius="1000px"
                  margin="0 0 15px 0"
                />
                <LoadingBox
                  height="15px"
                  width="300px"
                  borderRadius="1000px"
                  margin="0 0 15px 0"
                />
                <LoadingBox
                  height="15px"
                  width="350px"
                  borderRadius="1000px"
                  margin="0 0 15px 0"
                />
                <LoadingBox
                  height="15px"
                  width="300px"
                  borderRadius="1000px"
                  margin="0 0 15px 0"
                />
              </div>
            )}
          </section>
          {isLoaded ? (
            favIsLoading ? (
              <button className="add-fav">
                <Loading />
              </button>
            ) : isLiked ? (
              <button className="rem-fav" onClick={handleFavClick}>
                Hapus dari Favorit
              </button>
            ) : (
              <button className="add-fav" onClick={handleFavClick}>
                Tambahkan ke Favorit
              </button>
            )
          ) : (
            <LoadingBox height="35px" width="250px" borderRadius="1000px" />
          )}
        </div>
      </div>

      <div className="comment">
        {isLoaded ? (
          <Comments
            itemId={id}
            comments={comments}
            user={
              AuthenticationService.getCurrentUser()
                ? AuthenticationService.getCurrentUser().data
                : undefined
            }
            componentState={reloadComment}
            reloadComponent={(reload) => {
              setReloadComment(reload);
            }}
          />
        ) : (
          <Loading color="#333" />
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
