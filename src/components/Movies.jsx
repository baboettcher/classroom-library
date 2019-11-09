import React, { Component } from "react";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenreFilter: "",
    filteredMovies: []
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All Genres" }, ...getGenres()]
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("prevProps:", prevProps);
    // console.log("prevState:", prevState);
  }

  handleDelete = id => {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== id)
    });
  };

  handleLike = singleMovie => {
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(singleMovie);
    newMovies[index].liked = !singleMovie.liked;
    this.setState({
      movies: newMovies
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genreObject => {
    this.setState({
      selectedGenreFilter: genreObject,
      currentPage: 1
    });
  };

  render() {
    const {
      movies,
      genres,
      selectedGenreFilter,
      currentPage,
      pageSize
    } = this.state;

    // FILTER
    const filteredMovies =
      selectedGenreFilter && selectedGenreFilter._id
        ? movies.filter(movie => {
            return movie.genre.name === selectedGenreFilter.name;
          })
        : movies;

    const moviesLength = filteredMovies.length;

    // PAGINATE
    const moviesToDisplay = paginate(filteredMovies, currentPage, pageSize);

    if (moviesToDisplay.length === 0) {
      return <p>No movies to display</p>;
    }

    const currentMovies = movies
      ? moviesToDisplay.map((m, i) => {
          return (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td onClick={() => this.handleLike(m)}>
                <Like liked={m.liked} />
              </td>
              <td>
                <button
                  onClick={() => this.handleDelete(m._id)}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })
      : null;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            itemSelected={selectedGenreFilter}
          />
        </div>

        <div className="col">
          <h4>
            There are a total of {moviesLength} in {selectedGenreFilter.name}{" "}
            genre
          </h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Number In Stock</th>
                <th scope="col">Like</th>
              </tr>
            </thead>

            <tbody>{currentMovies}</tbody>
          </table>
          <Pagination
            totalItemCount={moviesLength}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            itemSelected={selectedGenreFilter}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
