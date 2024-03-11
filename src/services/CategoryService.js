import axios from "axios"
import { BASE_URL } from "../variables/URL"

export class CategoryService {
    static async getAllCategories() {
        const respones = await axios.get(`${BASE_URL}/category`)
        return respones.data
    }

    static async postCategory(body) {
        const response = await axios.put(`${BASE_URL}/category`, body, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("success-token")}` 
            }
        })
        return response.data
    }
}