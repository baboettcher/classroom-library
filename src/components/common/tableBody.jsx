import React, { Component } from "react";
import Like from "./like";
import PropTypes from "prop-types";

// MONDAY! - Next: move the data pieces here from movies
class TableBody extends Component {

  render() {
    const { data, dataToDisplay } = this.props
    console.log("data", data)
    console.log("dataToDisplay", dataToDisplay)

    const currentMovies = data
      ? dataToDisplay.map((m) => {
        return (
          <tr key={m._id}>
            <td>{m.title}</td>
            <td>{m.genre.name}</td>
            <td>{m.numberInStock}</td>
            <td onClick={() => this.handleLike(m)}>
              <Like liked={m.liked} />
            </td>
            <td>
              <button
                onClick={() => this.handleDelete(m._id)}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })
      : null;

    return (
      <tbody>{currentMovies}</tbody>
    )
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired
};


export default TableBody;


