import React, { Component } from "react";
import TableHeader from "./common/tableHeader"
import TableBody from "./common/tableBody"
import Like from "./common/like";

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
    key: "like",
    path: "like",
    content: item => (
      <Like
        onClick={() => this.props.onLike(item)}
        liked={item.liked} />
    )
  },
  {
    key: "delete",
    path: "delete",
    content: (item) => {
      return (
        <button
          onClick={() => this.props.onDelete(item._id)}
          type="button"
          className="btn btn-primary btn-sm"
        >Delete </button>
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

