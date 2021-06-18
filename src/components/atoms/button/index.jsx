import React from "react";
import "./button.scss";

function Button({ title, addClass, ...rest }) {
  return (
    <div>
      <button className={`button ${addClass}`} {...rest}>
        {title}
      </button>
    </div>
  );
}

export default Button;
