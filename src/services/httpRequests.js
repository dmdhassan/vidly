import Axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
Axios.interceptors.response.use(null, ex => {
    const expectedError = ex.response && ex.response.status >= 400 && ex.response.status < 500;
    if (!expectedError) {
      logger.log(ex)
      toast.error("An unkown error occured, kindly try again later");
    }
  
    return Promise.reject(ex)
  })

function setJwt(token) {
  Axios.defaults.headers.common['x-auth-token'] = token;
}

  export default ({
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    patch: Axios.patch,
    delete: Axios.delete,
    setJwt
  })