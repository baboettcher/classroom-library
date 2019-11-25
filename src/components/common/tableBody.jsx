import React, { Component } from "react";
import PropTypes from "prop-types";

// next: move the data pieces here from movies
class TableBody extends Component {
  render() {
    const { data } = this.props
    console.log(data)
    return (
      <tbody>{data}</tbody>
    )
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired
};


export default TableBody;
