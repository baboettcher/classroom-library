import React, { Component } from "react";
import TableHeader from "./common/tableHeader"
import TableBody from "./common/tableBody"

class MoviesTable extends Component {

  columns = [{
    name: "Los titulos",
    path: "title"
  },
  {
    name: "Genre",
    path: "genre.name"
  },
  {
    name: "Number In Stock",
    path: "numberInStock"
  },
  {
    name: "Like",
    key: "like",
    path: "like",
    content: (item, onLike, onDelete, Like) => {
      return (
        <td onClick={() => onLike(item)} >
          <Like liked={item[this.columns[3].path]} />
        </td>
      )
    }
  },
  {
    key: "delete",
    path: "delete",
    content: (item, onLike, onDelete) => {
      return (
        <td>
          <button
            onClick={() => onDelete(item._id)}
            type="button"
            className="btn btn-primary btn-sm"
          >
            Delete
    </button>
        </td>
      )

    }
  }
  ]


  render() {
    const { data, dataToDisplay, onSort, onDelete, onLike, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn} />
        <TableBody data={data} columns={this.columns} dataToDisplay={dataToDisplay} onDelete={onDelete} onLike={onLike} sortColumn={sortColumn} />
      </table>
    )
  }
}
export default MoviesTable;

