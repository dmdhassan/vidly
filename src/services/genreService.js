import http from "./httpRequests";

export const getGenres = () => {
    return http.get("/genres")

}