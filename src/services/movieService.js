import http from "./httpRequests";
import { base_url } from "../config.json";


function movieUrl(id) {
    return `${base_url}/movies/${id}`
}

export const getMovies = () => {
    return http.get(base_url + "/movies")
    
}

export const getMovie = (movieId) => {
    return http.get(movieUrl(movieId))
}

export const deleteMovie = (movieId) => {
    return http.delete(movieUrl(movieId))

}

export const saveMovie = (movie) => {
    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body);
        
    }
    
    console.log(movieUrl(movie._id))
    return http.post(base_url + "/movies", movie);
  }