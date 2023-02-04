import http from "./httpRequests";
import {base_url} from "../config.json";

export const getGenres = () => {
    return http.get(base_url + "/genres")

}