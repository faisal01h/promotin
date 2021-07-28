import React, { useState, useEffect } from "react";
import { Item } from "../../components/molecules";
import "./SavedEvent.scss";
import axios from 'axios'
import { Loading } from "../../components";

function SavedEvent() {

  const [ items, setItems ] = useState([])
  const [ isLoaded, setIsLoaded ] = useState(false);

 useEffect(() => {
  axios.get("//promotin.herokuapp.com/api/v1/event/fav")
  .then(result => {
    setItems(result.data.data.reverse())
  })
  .then(e => {
    setIsLoaded(true)
  })
 }, [])

  return (
    <div className="saved-event-wrapper">
      <h1>Event Favorit</h1>
      <div className="saved-event">
        {
          !isLoaded ?
            <Loading top="50%" color="#333" />
          : items.length > 0 ?
            items.map((e) => {
              return (<Item key={e} id={e} />)
            })
            :
            <h2>Tidak ada event favorit</h2>
        }
      </div>
    </div>
  );
}

export default SavedEvent;
