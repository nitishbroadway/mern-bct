import axios from "axios"

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

export default http