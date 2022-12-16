import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://127.0.0.1:3001'

export default axios.create({
    baseURL
})