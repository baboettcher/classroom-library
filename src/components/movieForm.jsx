import React from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import Form from "./common/form"
import Joi from "joi-browser"
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

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

  async populateGenres() {
    const { data: genres } = await getGenres()
    this.setState({ genres })
  }

  async populateMovie() {
    try {
      const { id: movieId } = this.props.match.params
      if (movieId === "new") return

      const { data: movie } = await getMovie(movieId)
      this.setState({ data: this.mapToViewModel(movie) })
    }
    catch (err) {
      if (err.response && err.response.status === 404) {
        // return not needed; invalid ID and user is redirected to not-found
        this.props.history.replace("/not-found")
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres()
    await this.populateMovie()
  }


  mapToViewModel(movieObject) {
    return {
      // _id: movieObject._id,
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
