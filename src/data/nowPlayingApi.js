import { apiClient } from "../common/apiClient";

export const nowPlayingApi = {
    async getNowPlayingApi() {
        return await apiClient.fetch('get', '/movie/now_playing', null)
    }
}