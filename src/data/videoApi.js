import { apiClient } from "../common/apiClient"

export const videoApi = {
    async getVideoApi(type, id) {
        return await apiClient.fetch('get', `/${type}/${id}/videos`, null)
    }
}