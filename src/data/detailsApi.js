import { apiClient } from "../common/apiClient"


export const detailsApi = {
    async getDetailsApi(type, id) {
        return await apiClient.fetch('get', `/${type}/${id}`, null)
    }
}