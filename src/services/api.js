import axios from "axios";
export const api = axios.create({
    baseURL: 'http://localhost:8800'

    // baseURL: process.env.REACT_APP_API_URL
})