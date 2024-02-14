import axios from "axios"
import { BASE_URL } from "../variables/URL"

export class CategoryService {
    static async getAllCategories() {
        const respones = await axios.get(`${BASE_URL}/category`)
        return respones.data
    }
}