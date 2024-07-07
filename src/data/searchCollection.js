import { apiClient } from "../common/apiClient"


export const searchCollection = {
    async getSearchCollection(query) {
        return await apiClient.fetch('get', `/search/multi`, { params: { query } })
    }
}