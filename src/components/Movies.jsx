import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenreFilter: {},
    filteredMovies: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()]
    });
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

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    })
  }

  render() {
    const {
      movies,
      genres,
      selectedGenreFilter,
      currentPage,
      pageSize,
      sortColumn
    } = this.state;

    // 1. FILTER
    const filteredMovies =
      selectedGenreFilter && selectedGenreFilter._id
        ? movies.filter(movie => {
          return movie.genre.name === selectedGenreFilter.name;
        })
        : movies;

    const moviesLength = filteredMovies.length;

    // 2. SORT
    const sortedMovies = _.orderBy(filteredMovies, sortColumn.path, sortColumn.order)

    // 3. PAGINATE
    const moviesToDisplay = paginate(sortedMovies, currentPage, pageSize);

    if (movies.length === 0) {
      return <p>No movies to display</p>;
    }

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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}>New</Link>
          <MoviesTable
            data={movies}
            dataToDisplay={moviesToDisplay}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike} />

          <Pagination
            totalItemCount={moviesLength}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            itemSelected={selectedGenreFilter}
          />
          <h6>Issue with moviesToDisplay: {moviesToDisplay.length}</h6>

        </div>
      </div>
    );
  }
}

export default Movies;


