import React, { Component } from "react";
import _ from "lodash"
import Like from "./like";
import PropTypes from "prop-types";

class TableBody extends Component {

  render() {
    const { data, dataToDisplay, onDelete, onLike, columns } = this.props

    // Get rid of titles array and use columns
    // then create content property and add likes


    console.log("columns---->", columns)
    const currentMovies = data
      ? dataToDisplay.map((item, i) => {
        // console.log(i, m)
        return (
          <tr key={i}>
            {columns.map((column) => {
              return (
                <td>{_.get(item, column.path)}</td>
              )
            })}

            {/* 
            <td onClick={() => onLike(item)}>
              <Like liked={item[columns[3].path]} />
            </td> 
            <td>
              <button
                onClick={() => onDelete(item._id)}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Delete
              </button>
            </td>
 */}

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

/*
const currentMovies = data
? dataToDisplay.map((m) => {
  return (
    <tr key={m._id}>
      <td>{m.title}</td>
      <td>{m.genre.name}</td>
      <td>{m.numberInStock}</td>
      <td onClick={() => onLike(m)}>
        <Like liked={m.liked} />
      </td>
      <td>
        <button
          onClick={() => onDelete(m._id)}
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
 */