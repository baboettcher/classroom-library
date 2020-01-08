import React from 'react';
import Form from "./common/form"
import Joi from "joi-browser"
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreID: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Username"),
    genreID: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number In Stock")
      .min(0)
      .max(100),
    dateRentalRate: Joi.number()
      .required()
      .label("Daily Rental Rate")
      .min(1)
      .max(10),
  }

  componentDidMount() {
    const genres = getGenres()
    this.setState({ genres })

    const { id: movieId } = this.props.match.params
    if (movieId === "new") return

    const movie = getMovie(movieId)
    if (!movie) { return this.props.history.replace("/not-found") }
    // history.push would create infinite loop
    // don't assume code below won't execute if user redirected

    this.setState({ data: this.mapToViewModel(movie) })
  }

  mapToViewModel(movieObject) {
    return {
      _id: movieObject._id,
      title: movieObject.title,
      genreID: movieObject.genre._id,
      numberInStock: movieObject.numberInStock,
      dailyRentalRate: movieObject.dailyRentalRate
    }
  }

  renderSelect(genreId, genreLabel) {
    // iterate through list of genres
    // add "selected" to the menu
    console.log("GENRES:", this.state.genres)
    const genresMenu = this.state.genres.map((item) => {

      return (
        <option key={item._id} value={item.name} >{item.name}</option>
      )
    })
    return (
      <>
        <p>{genreLabel}</p>
        <select>
          {genresMenu}
        </select>
      </>
    )
  }

  doSubmit = (movieObject) => {
    // call server
    this.saveMove(this.state.data)
    console.log("submitted")
  }

  render() {
    const { match, history } = this.props;
    const { id } = match
    console.log("state-->", this.state)

    return (
      <React.Fragment>
        <h1>MovieForm{id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("", "Genre")}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment >
    );
  }
}


export default MovieForm;

{/*         <button className="btn btn-primary" onClick={
  () => {
    history.push("/movies")
  }
}>Save</button>
*/}
