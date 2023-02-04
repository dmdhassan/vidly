import http from "./httpRequests";
import { base_url } from "../config.json";


export const register = async (user) => {
    return await http.post(base_url + "/users", {
        name: user.name,
        email: user.username,
        password: user.password
    })
}