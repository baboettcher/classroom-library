import React from 'react';
import axios from 'axios'
import Form from "./common/form"
import Joi from "joi-browser"
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
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
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };


  componentDidMount() {
    // const { data: posts } = await axios.get("http://jsonplaceholder.typicode.com/posts")

    // console.log("posts", posts)
    // this.setState({ posts })

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
      genreId: movieObject.genre._id,
      numberInStock: movieObject.numberInStock,
      dailyRentalRate: movieObject.dailyRentalRate
    }
  }


  doSubmit = () => {
    saveMovie(this.state.data)
    this.props.history.push("/movies");
  }

  render() {
    console.log("genreId-->", this.state.data)
    return (
      <React.Fragment>
        <h1>MovieForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment >
    );
  }
}


export default MovieForm;
