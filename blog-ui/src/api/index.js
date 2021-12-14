import axios from "axios";

const HTTP = axios.create({
    baseURL: '/api'
});

export default HTTP;