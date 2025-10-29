import { axiosInstance } from "./axios"

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData) //send signup data
    return response.data
  }