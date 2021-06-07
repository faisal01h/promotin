import React from "react";
import { Item } from "../../components/molecules";
import "./SavedEvent.scss";

function SavedEvent() {
  return (
    <div className="saved-event-wrapper">
      <h1>Saved Item</h1>
      <div className="saved-event">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default SavedEvent;
