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

  // const genres = await getGenres()
  // const movies = getMovies()
  // let movieInDb = movies.find(m => m._id === movie._id) || {};
  // movieInDb.title = movie.title;
  // movieInDb.genre = genres.find(g => g._id === movie.genreId);
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;

  // if (!movieInDb._id) {
  //   movieInDb._id = Date.now().toString()
  //   movies.push(movieInDb);
  // }

  //return movieInDb;
}


export function deleteMovie(id) {
  return http.delete(apiEndpoint + "/movies/" + id);
}
