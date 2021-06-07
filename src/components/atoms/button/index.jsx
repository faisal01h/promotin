import React from "react";
import { useHistory } from "react-router";
import "./button.scss";

function Button({ title, redirect, ...rest }) {
  const history = useHistory();

  return (
    <div>
      <button
        className="button"
        {...rest}
        onClick={() => history.push(`${redirect}`)}
      >
        {title}
      </button>
    </div>
  );
}

export default Button;
