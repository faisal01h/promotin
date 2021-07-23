import React, { useState, useEffect } from "react";
import { Item } from "../../components/molecules";
import "./SavedEvent.scss";
import axios from 'axios'

function SavedEvent() {

  const [ items, setItems ] = useState([])

 useEffect(() => {
  axios.get("//promotin.herokuapp.com/api/v1/event/fav")
  .then(result => {
    setItems(result.data.data)
  })
 })

  return (
    <div className="saved-event-wrapper">
      <h1>Saved Item</h1>
      <div className="saved-event">
        {
          items.map((e) => {
            return (<Item key={e} id={e} />)
          })
        }
      </div>
    </div>
  );
}

export default SavedEvent;
