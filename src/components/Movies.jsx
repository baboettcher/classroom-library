import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
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
    searchQuery: "",
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
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  handleSearch = query => {
    this.setState({
      searchQuery: query, selectedGenreFilter: null, currentPage: 1
    })
  }



  render() {
    const {
      movies,
      genres,
      selectedGenreFilter,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery
    } = this.state;

    // 1. FILTER
    let filteredMovies = movies

    if (searchQuery) {
      filteredMovies = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    else if (selectedGenreFilter && selectedGenreFilter._id) {
      filteredMovies = movies.filter(movie => movie.genre._id === selectedGenreFilter._id)
    }

    // 2. SORT
    const sortedMovies = _.orderBy(filteredMovies, sortColumn.path, sortColumn.order)

    const moviesLength = filteredMovies.length;


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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}>New</Link>
          <h4>
            There are a grand total of {moviesLength} in {selectedGenreFilter ? selectedGenreFilter.name : null}{" "}
            genre
          </h4>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

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


