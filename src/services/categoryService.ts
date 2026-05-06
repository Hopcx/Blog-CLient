import axiosInstance from '../api/axiosInstance'
import { type Category } from '../types/category'

export const categoryService = {
  getTree: async (): Promise<Category[]> => {
    const res = await axiosInstance.get('/categories/tree')
    return res.data
  },
}