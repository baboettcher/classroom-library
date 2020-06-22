import axios from "axios"
//import Raven from 'raven-js'
import logger from './logService'
import { toast } from 'react-toastify'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

// axios.interceptors.response.use(success, error)
// null passed for 'success' because not important here, perhaps in the futire this would be logged somewhere
// error executed everytime we have a response with an error
axios.interceptors.response.use(null, error => {

  const expectError = error.response && error.response.status >= 400 && error.response.status < 500

  if (!expectError) {
    console.log("INTERCEPTOR CALLED - Logging the error", error)

    // Raven.captureException(error)
    //logger.log(error)

    // RED
    // toast.error("An unexpected error occurred ")
    // RAINBOW
    toast("INTERCEPTOR: An unexpected error occurred ")
    // ALSO:
    //        toast.success
    //        toast.info

  }

  // to pass control to catch block, we need to pass a rejected promise

  return Promise.reject(error) // this called first, then catch block

})

// export object with methods
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}