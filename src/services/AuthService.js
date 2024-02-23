import axios from "axios";
import { BASE_URL } from './../variables/URL';

export class AuthService {
    static async authPost(body) {
        const response = await axios.post(`${BASE_URL}/auth`, body)
        return response.data 
    }

    static async checkAuth() {
        return await axios.post(`${BASE_URL}/checkAuth`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("success-token")}` 
            }
        })
    }
}