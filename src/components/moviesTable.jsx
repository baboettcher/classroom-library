import React, { Component } from "react";

class MoviesTable extends Component {
  raiseSort = () => {
    console.log("#1")
    //hi
  }
  raiseSort2() {
    console.log("#2")
  }


  render() {
    const { data, onSort } = this.props;

    return (<table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => onSort("title")}>
            Title
        </th>

          <th scope="col" onClick={() => onSort("genre.name")}>
            Genre
        </th>
          <th scope="col" onClick={() => onSort("numberInStock")}>
            Number In Stock
        </th>
          <th scope="col" onClick={() => onSort("like")}>
            Like
        </th>
        </tr>
      </thead>

      <tbody>{data}</tbody>
    </table>);
  }
}

export default MoviesTable;
