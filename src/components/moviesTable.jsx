import React, { Component } from "react";

class MoviesTable extends Component {
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
    const { data } = this.props;

    return (<table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => this.raiseSort("title")}>
            Title
        </th>

          <th scope="col" onClick={() => this.raiseSort("genre.name")}>
            Genre
        </th>
          <th scope="col" onClick={() => this.raiseSort("numberInStock")}>
            Number In Stock
        </th>
          <th scope="col" onClick={() => this.raiseSort("like")}>
            Like
        </th>
        </tr>
      </thead>

      <tbody>{data}</tbody>
    </table>);
  }
}

export default MoviesTable;
