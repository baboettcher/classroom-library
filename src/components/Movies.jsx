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
      pageSize,
      startingIndex,
      endingIndex
    } = this.state;

    // FILTER
    // FRIDAY - selectedGenreFilter is now an object
    // it should be compated on line 100 with selectedGenreFilter.name
    // SOLVE IT!
    const filteredMovies2 =
      selectedGenreFilter && selectedGenreFilter._id
        ? movies.filter(movie => {
            return movie.genre.name === selectedGenreFilter.name;
          })
        : movies;
    console.log("====selectedGenreFilter.name ===>", selectedGenreFilter.name);
    console.log("====selectedGenreFilter ===>", selectedGenreFilter);
    console.log("filteredMovies2 ===>", filteredMovies2);

    // let filteredMovies = movies.slice();

    // if (selectedGenreFilter !== "All Genres") {
    //   filteredMovies = movies.filter(m => {
    //     return m.genre.name === selectedGenreFilter;
    //   });
    // }

    //  const moviesLength = filteredMovies.length;
    const moviesLength2 = filteredMovies2.length;

    // PAGINATE
    // const moviesToDisplay = paginate(filteredMovies, currentPage, pageSize);
    const moviesToDisplay2 = paginate(filteredMovies2, currentPage, pageSize);

    if (moviesToDisplay2.length === 0) {
      return <p>No movies to display</p>;
    }

    /*     const currentMovies = movies
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
 */
    const currentMovies2 = movies
      ? moviesToDisplay2.map((m, i) => {
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
            There are a total of {moviesLength2} in {selectedGenreFilter.name}{" "}
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

            <tbody>{currentMovies2}</tbody>
          </table>
          <Pagination
            totalItemCount={moviesLength2}
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
