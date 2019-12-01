import React from "react";

const Like = props => {
  let heartGraphic = "fa fa-heart";
  if (!props.liked) {
    heartGraphic += "-o";
  }
  return (
    <i
      onClick={props.onClick}
      className={heartGraphic}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
