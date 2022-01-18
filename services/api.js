import axios from 'axios'

export const api = axios.create({
    baseURL: "https://api.rss2json.com/v1",
});