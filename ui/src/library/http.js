import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

// interceptors

http.interceptors.request.use(config => {
    const token = localStorage.getItem('mbcttoken')

    if(token) {
        config.headers.setAuthorization(`Bearer ${token}`)
    }

    return config
})

http.interceptors.response.use(response => {
    if('message' in response.data) {
        toast.success(response.data.message)
    }

    return response
}, error => {
    if('message' in error.response.data) {
        toast.error(error.response.data.message)
    }

    return Promise.reject(error)
})

export default http