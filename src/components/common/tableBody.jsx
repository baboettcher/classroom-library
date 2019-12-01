import React, { Component } from "react";
import _ from "lodash"
import PropTypes from "prop-types";

class TableBody extends Component {
  renderCell = (item, column) => {
    return (column.content ? column.content(item) : _.get(item, column.path)
    )
  }
  render() {
    const { data, dataToDisplay, columns } = this.props
    const currentMovies = data
      ? dataToDisplay.map((item) => {
        return (
          <tr key={item._id}>
            {columns.map((column, j) => {
              return (
                <td key={j}>{this.renderCell(item, column)}</td>
              )
            })}
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
