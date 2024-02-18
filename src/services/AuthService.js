import axios from "axios";
import { BASE_URL } from './../variables/URL';

export class AuthService {
    static async authPost(body) {
        return await axios.post(`${BASE_URL}/auth`, body)
    }
}