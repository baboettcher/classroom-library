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

// DAILY GIT REVERT
// git log 
// git log --oneline



/* import React from "react";

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
 */