import { apiClient } from "../common/apiClient"

export const detailsCredit = {
    async getDetailsCredit(type, id) {
        return await apiClient.fetch('get', `/${type}/${id}/credits`, null)
    }
}