import React, { Component } from "react";
import TableHeader from "./common/tableHeader"
import TableBody from "./common/tableBody"

class MoviesTable extends Component {

  render() {
    const { data, dataToDisplay, onSort, onDelete, onLike, columns, sortColumn } = this.props;

    console.log("columns:", columns)
    console.log("sortColumn:", sortColumn)

    return (
      <table className="table">
        <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
        <TableBody data={data} columns={columns} dataToDisplay={dataToDisplay} onDelete={onDelete} onLike={onLike} sortColumn={sortColumn} />
      </table>
    )
  }
}
export default MoviesTable;

