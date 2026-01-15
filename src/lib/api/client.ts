import axios, { type AxiosInstance } from 'axios'

export const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - could redirect to login
      console.error('Unauthorized request')
    }
    return Promise.reject(error)
  }
)
