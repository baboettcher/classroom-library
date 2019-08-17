import React, { Component } from "react";
import { getMovies, getMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    this.setState({
      movies: getMovies()
    });
  }

  handleDelete = id => {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== id)
    });
  };

  render() {
    if (this.state.movies.length === 0) {
      return <p>No movies in database</p>;
    }
    const currentMovies = this.state.movies
      ? this.state.movies.map((m, i) => {
          return (
            <tr key={m._id}>
              <td>{i + 1}</td>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>
                <button
                  onClick={() => this.handleDelete(m._id)}
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })
      : null;

    console.log("this.state.movies -->", this.state.movies);

    return (
      <main className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Number In Stock</th>
            </tr>
          </thead>

          <tbody>{currentMovies}</tbody>
        </table>
      </main>
    );
  }
}

export default Movies;
