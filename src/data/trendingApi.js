import { apiClient } from "../common/apiClient";

export const trendingApi = {
    async getTrendingApi() {
        return await apiClient.fetch('get', '/trending/all/day', null)
    }
}