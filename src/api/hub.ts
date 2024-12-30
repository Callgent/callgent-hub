import instance from './axiosInstance'

export const getHubList = async (page: number, query: string) => {
    return await instance.get("/api/hub/callgents", {
        params: {
            perPage: 3,
            page, query
        }
    })
}
