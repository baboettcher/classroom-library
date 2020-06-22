import http from './httpService'
//import { apiUrl } from '../config.json'

//const apiEndpoint = apiUrl + "/movies"
const apiEndpoint = "/movies"

function movieUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies() {
  return http.get(apiEndpoint);
}


export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}


export async function saveMovie(movie) {
  if (movie._id) {
    // if movie exists, update with put
    const modifiedMovie = { ...movie }
    delete modifiedMovie._id
    return http.put(movieUrl(movie._id), modifiedMovie)
  } else {
    // otherwise create new movie
    return http.post(apiEndpoint, movie)
  }
}


export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
