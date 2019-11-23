import React from "react";

/* class Like extends Component {
  render() {
    let heartGraphic = "fa fa-heart";
    if (this.props.liked) {
      heartGraphic += "-o";
    }

    return (
      <>
        <i
          className={heartGraphic}
          aria-hidden="false"
          onClick={() => console.log("like")}
        />
      </>
    );
  }
} */

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
