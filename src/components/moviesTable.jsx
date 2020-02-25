import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "./common/table"
import Like from "./common/like";

class MoviesTable extends Component {

  // LATER: add spanish/english toggle
  columns = [{
    name: "Los titulos",
    path: "title",
    content: item => (
      <Link
        to={`/movies/${item._id}`}>{item.title}</Link>
    )
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
    console.log(this.props, "------>>>>>")
    const { data, dataToDisplay, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <Table
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          dataToDisplay={dataToDisplay}
          data={data} />
      </table>
    )
  }
}
export default MoviesTable;

