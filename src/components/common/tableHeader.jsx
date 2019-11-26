import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {

  raiseSort = (path) => {
    const { onSort } = this.props
    const sortColumnTemp = { ...this.props.sortColumn } // to not mutate
    if (sortColumnTemp.path === path)
      sortColumnTemp.order = (sortColumnTemp.order === "asc") ? "desc" : "asc"
    else {
      sortColumnTemp.path = path
      sortColumnTemp.order = "asc"
    }
    onSort(sortColumnTemp)
  }

  render() {
    const { columns } = this.props
    const headers = columns.map(column => {
      return (
        <th key={column.path || column.key} scope="col" onClick={() => this.raiseSort(column.path)}>
          {column.name}
        </th>)
    })
    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }
}


TableHeader.propTypes = {
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};



export default TableHeader;
