import { apiClient } from "../common/apiClient"

export const detailsSimilar = {
    async getDetailsSimilar(type, id) {
        return await apiClient.fetch('get', `/${type}/${id}/similar`, null)
    }
}