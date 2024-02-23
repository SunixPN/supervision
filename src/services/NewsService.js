import axios from "axios"
import { BASE_URL } from "../variables/URL"

export class NewsService {
    static async postNews(body) {
        const response = await axios.post(`${BASE_URL}/news`, body, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("success-token")}` 
            }
        })
        return response.data 
    }

    static async getNews() {
        const respones = await axios.get(`${BASE_URL}/news`)
        return respones.data
    }

    static async getNewsWithLimit(limit, page) {
        const response = await axios.get(`${BASE_URL}/news`, {
            params: {
                limit: limit,
                page: page
            }
        })

        return response.data
    }
}