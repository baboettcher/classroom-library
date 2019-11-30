import React, { Component } from "react";
import _ from "lodash"
import PropTypes from "prop-types";

class TableBody extends Component {

  render() {
    const { data, dataToDisplay, columns } = this.props
    const currentMovies = data
      ? dataToDisplay.map((item, i) => {
        return (
          <tr key={i}>
            {columns.map((column) => {
              return (
                <td>{column.content ? column.content(item) : _.get(item, column.path)}</td>
              )
            })}
            {/* 
            <td onClick={() => onLike(item)} >
              <Like liked={item[columns[3].path]} />
            </td> */}

            {/* <td>
              <button
                onClick={() => onDelete(item._id)}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Delete
              </button>
            </td> */}

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
