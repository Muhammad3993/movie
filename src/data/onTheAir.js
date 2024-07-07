import { apiClient } from "../common/apiClient"

export const onTheAir = {
    async getOnTheAirApi() {
        return await apiClient.fetch('get', '/tv/on_the_air', null)
    }
}