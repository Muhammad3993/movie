import { config } from "../config"
import axios from "axios"

export const apiClient = {
    async fetch(method, path, body = {}){
        const axios_parameters = {
            method: method,
            url: `${config.baseUrl}${path}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.token}`
            },
        }

        if (body && body.params) {
            axios_parameters.params = body.params;
        }

        if(body !== null && body !== {})
        {
            axios_parameters.data = body;
        }

        try{
            const response = await axios(axios_parameters);
            if (response.status === 200) {
                return response.data
            }
        }catch(e){
            console.log(e);
        }
    }
}