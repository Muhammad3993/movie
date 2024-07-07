import { apiClient } from "../common/apiClient"

export const recommendApi = {
    async getRecommendations(type, id) {
        return await apiClient.fetch("get", `/${type}/${id}/recommendations`, null) 
    }
}