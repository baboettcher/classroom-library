import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {

  // move raiseSort insert below
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
    const { data } = this.props
    const { titlesArray } = this.props
    const headers = titlesArray.map(title => {
      return (
        <th key={title.path || title.key} scope="col" onClick={() => this.raiseSort(title.path)}>
          {title.name}
        </th>)
    })
    return (
      <table className="table">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>);
  }
}


TableHeader.propTypes = {
  titlesArray: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired
};



export default TableHeader;
