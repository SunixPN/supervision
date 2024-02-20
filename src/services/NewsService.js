import axios from "axios"
import { BASE_URL } from "../variables/URL"

export class NewsService {
    static async postNews(body) {
        const response = await axios.post(`${BASE_URL}/news`, body)
        return response.data 
    }

    static async getNews() {
        const respones = await axios.get(`${BASE_URL}/news`)
        return respones.data
    }

    static async getNewsWithLimit(limit) {
        return await axios.get(`${BASE_URL}/news`, {
            params: {
                limit: limit
            }
        })
    }
}