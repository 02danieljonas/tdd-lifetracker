import axios from "axios";
class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }
    setToken(token) {
        this.token = token;
    }
    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
        };
        if (this.token) {
            console.log("ffffff", this.token)
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers });
            localStorage.setItem("accessToken", res.data.user.accessToken);
            return { data: res.data, error: null };
        } catch (error) {
            console.log({ url, method, data, headers })
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async loginUser(credentials) {
        return await this.request({
            endpoint: "auth/login",
            method: "POST",
            data: credentials,
        });
    }
    async signupUser(credentials) {
        return await this.request({
            endpoint: "auth/register",
            method: "POST",
            data: credentials,
        });
    }

    async createNutrition(data) {
        console.log(data)
        return await this.request({endpoint: "nutrition", method: "POST", data:data})
    }
}

export default new ApiClient("http://localhost:3001");
