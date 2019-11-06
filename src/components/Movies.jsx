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
    startingIndex: 1,
    endingIndex: 99,
    filterBy: "All Genres",
    filteredMovies: []
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres()
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
    console.log(singleMovie);
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(singleMovie);
    newMovies[index].liked = !singleMovie.liked;
    this.setState({
      movies: newMovies
    });
  };

  handlePageChange = page => {
    const moviesLength = this.state.filteredMovies.length;
    const { pageSize } = this.state;
    const startingIndex = (page - 1) * pageSize + 1;

    this.setState({ startingIndex, currentPage: page });

    // pageSize = 4

    // start         ending            moviesLength
    // 1             1 + 4 = 5           9

    // STILL BUGGY WITH THE ending index
    // ALSO, how to begin with the ending index
    if (startingIndex + pageSize - 1 > moviesLength) {
      console.log("YES IT IS!!!");
      this.setState({
        endingIndex: startingIndex + (moviesLength % pageSize)
        //                                  9        %
      });
    } else {
      this.setState({
        endingIndex: startingIndex + pageSize - 1
      });
    }
  };

  handleGenreSelect = genreObject => {
    this.setState({
      filterBy: genreObject.name
    });
  };

  render() {
    const {
      movies,
      genres,
      filterBy,
      currentPage,
      pageSize,
      startingIndex,
      endingIndex
    } = this.state;

    // FILTER THE MOVIES
    let filteredMovies = movies.slice();

    if (filterBy !== "All Genres") {
      filteredMovies = movies.filter(m => {
        return m.genre.name === filterBy;
      });
    }

    const moviesLength = filteredMovies.length;
    console.log("moviesLength-->", moviesLength);
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
            itemSelected={filterBy}
          />
        </div>
        <div className="col">
          <h4>
            There are a total of {movies.length} in {filterBy} genre
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
            itemSelected={filterBy}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
