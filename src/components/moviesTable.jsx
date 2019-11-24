import React, { Component } from "react";
import TableHeader from "./common/tableHeader"

class MoviesTable extends Component {


  render() {
    const { data, onSort, sortColumn } = this.props;

    return (
      <div>
        <TableHeader data={data} titlesArray={[
          {
            name: "Title",
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
            path: "like"
          },

          { key: "delete" }]} onSort={onSort} sortColumn={sortColumn} />
      </div>
    )
  }
}
export default MoviesTable;

