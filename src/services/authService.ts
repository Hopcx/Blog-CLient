import axiosInstance from '../api/axiosInstance'
import { type AuthResponse, type LoginRequest, type RegisterRequest } from '../types/user'

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await axiosInstance.post('/auth/register', data)
    return res.data
  },
}