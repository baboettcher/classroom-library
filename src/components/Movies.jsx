import React, { Component } from "react";
import Like from "./common/like";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { getTitles } from "../services/fakeTitlesService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    titles: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenreFilter: {},
    filteredMovies: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
      titles: [...getTitles()]
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

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    })
  }

  render() {
    const {
      movies,
      genres,
      titles,
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
          <MoviesTable onSort={this.handleSort} sortColumn={sortColumn} data={currentMovies} titles={titles} />

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


