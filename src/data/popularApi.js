import { apiClient } from "../common/apiClient";

export const popularApi = {
    async getPopularApi() {
        return await apiClient.fetch('get', '/movie/top_rated', null)
    }
}