import axios from "axios";
import { Navigate } from "react-router-dom";

const navi
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    function (error) {
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      const originalRequest = error.config
  
      if (
        error.response.status === 401 &&
        originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
      ) {
        router.push('/login')
        return Promise.reject(error)
      }
  
    //   if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true
    //     const refreshToken = localStorageService.getRefreshToken()
    //     return axios
    //       .post('/auth/token', {
    //         refresh_token: refreshToken
    //       })
    //       .then(res => {
    //         if (res.status === 201) {
    //           localStorageService.setToken(res.data)
    //           axios.defaults.headers.common['Authorization'] =
    //             'Bearer ' + localStorageService.getAccessToken()
    //           return axios(originalRequest)
    //         }
    //       })
    //   }
      return Promise.reject(error)
    }
  )