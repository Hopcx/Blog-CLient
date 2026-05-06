import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7040/api', //  đổi port theo BE
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — tự động gắn JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — xử lý 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance