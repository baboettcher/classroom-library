import http from './httpService'
import { apiEndpoint } from '../config.json'
import { getGenres } from "./genreService";


export function getMovies() {
  return http.get(apiEndpoint + "/movies");
}


export function getMovie(movieId) {
  return http.get(apiEndpoint + "/movies/" + movieId);
}


export async function saveMovie(movie) {

  // if movie exists, update with put
  if (movie._id) {
    // need to remove ID from body bc already exists in URL

    const modifiedMovie = { ...movie }
    delete modifiedMovie._id

    return http.put(apiEndpoint + "/movies/" + movie._id, modifiedMovie)
  } else {

    // create new movie
    return http.post(apiEndpoint + "/movies", movie)

  }

}


export function deleteMovie(id) {
  console.log("delete!", id)
  return http.delete(apiEndpoint + "/movies/" + id);
}
