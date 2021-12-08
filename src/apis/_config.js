import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api/v1'
})

// on before request
axiosInstance.interceptors.request.use(
  (config) => {
    // request 時帶入 JWT
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

export default axiosInstance