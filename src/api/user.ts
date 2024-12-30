import instance from './axiosInstance'

export const getUserInfo = async () => {
    return await instance.get("/api/users/info")
}
