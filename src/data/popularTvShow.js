import { apiClient } from "../common/apiClient"

export const popularTvShow = {
    async getPopularTvShow() {
        return await apiClient.fetch('get', '/tv/popular', null);
    } 
}