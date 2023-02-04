import http from "./httpRequests";


export const register = async (user) => {
    return await http.post("/users", {
        name: user.name,
        email: user.username,
        password: user.password
    })
}