import { apiClient } from "../common/apiClient"

export const discoverApi = {
    async getDiscoverApi(explore, params) {
        return await apiClient.fetch('get', `/discover/${explore}`, params)
    }
}