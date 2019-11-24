import React from "react";

const Like = props => {
  let heartGraphic = "fa fa-heart";
  if (props.liked) {
    heartGraphic += "-o";
  }
  return (
    <i
      className={heartGraphic}
      aria-hidden="false"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
