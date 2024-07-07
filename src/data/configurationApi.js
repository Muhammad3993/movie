import { apiClient } from "../common/apiClient";

export const configurationApi = {
    async getConfigurationApi() {
        return await apiClient.fetch('get', '/configuration', null)
    }
}