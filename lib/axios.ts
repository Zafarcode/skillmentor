import axios, { AxiosInstance } from 'axios'

const baseURL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com' // Replace with your API base URL

const axiosInstance: AxiosInstance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(
	config => {
		// You can add authorization tokens or other configurations here
		const token = localStorage.getItem('token') // Example of adding a token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		// Handle successful response
		return response
	},
	error => {
		// Handle error response, like logging out users on 401
		if (error.response && error.response.status === 401) {
			// Example: redirect to login page
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)

export default axiosInstance
