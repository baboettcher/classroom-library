import React, { Component } from "react";
import TableHeader from "./common/tableHeader"
import TableBody from "./common/tableBody"


class MoviesTable extends Component {
  render() {
    const { titles } = this.props
    const { data, dataToDisplay, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader titlesArray={titles} onSort={onSort} sortColumn={sortColumn} />
        <TableBody data={data} dataToDisplay={dataToDisplay} />
      </table>
    )
  }
}
export default MoviesTable;

