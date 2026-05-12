import axiosInstance from '../api/axiosInstance'
import { type Post, type PagedResult, type CreatePostRequest } from '../types/post'

export const postService = {
  getPosts: async (
    page = 1,
    pageSize = 10,
    status?: string,
    search?: string,      // ← thêm
    categoryId?: string,  // ← thêm
    tag?: string          // ← thêm
  ): Promise<PagedResult<Post>> => {
    const res = await axiosInstance.get('/posts', {
      params: {
        page,
        pageSize,
        status,
        search,
        categoryId,
        tag
      }
    })
    return res.data
  },

  getPostBySlug: async (slug: string): Promise<Post> => {
    const res = await axiosInstance.get(`/posts/${slug}`)
    return res.data
  },

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const res = await axiosInstance.post('/posts', data)
    return res.data
  },

  updatePost: async (id: string, data: Partial<CreatePostRequest>): Promise<Post> => {
    const res = await axiosInstance.put(`/posts/${id}`, data)
    return res.data
  },

  deletePost: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`)
  },
}