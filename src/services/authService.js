import http from "./httpRequests";
import { base_url } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = 'token';

http.setJwt(getJwt())

export const login = async (email, password) => {
    const { data:jwt } = await http.post(base_url + "/auth", {
        email,
        password
    })

    localStorage.setItem(tokenKey, jwt)
    
}

export const loginWithJwt = (jwt) => {
    localStorage.setItem(tokenKey, jwt)
}

export const getUser = () => {
    const jwt = getJwt();
    const user = jwtDecode(jwt);
    return user;
}

export const logout = () => {
    localStorage.removeItem(tokenKey)
}

export function getJwt(){
    const token = localStorage.getItem(tokenKey);
    return token;
}


export default {
    login,
    loginWithJwt,
    logout,
    getUser,
    getJwt
  };