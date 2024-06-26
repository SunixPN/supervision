import axios from "axios";
import { BASE_URL } from "../variables/URL";

export class TestService {
    static async getTest() {
        const response = await axios.get(`${BASE_URL}/test`)
        return response.data
    }

    static async postTestResult(body) {
        const response = await axios.put(`${BASE_URL}/testResult`, body)
        return response.data
    }

    static async postTest(body) {
        const response = await axios.post(`${BASE_URL}/test`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("success-token")}`
            }
        })
        return response.data
    }

    static async getTestResultById(id) {
        const response = await axios.get(`${BASE_URL}/testResult?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("success-token")}`
            }
        })

        return response.data
    }

    static async deleteTest(id) {
        const response = await axios.delete(`${BASE_URL}/test`, {
            data: {
                testId: id
            },

            headers: {
                Authorization: `Bearer ${localStorage.getItem("success-token")}`
            }
        })

        return response.data
    }
}