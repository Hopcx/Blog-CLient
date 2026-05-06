import axiosInstance from '../api/axiosInstance'
import { type Comment, type AddCommentRequest } from '../types/comment'

export const commentService = {
  getByPost: async (postId: string): Promise<Comment[]> => {
    const res = await axiosInstance.get(`/comments/post/${postId}`)
    return res.data
  },

  addComment: async (data: AddCommentRequest): Promise<Comment> => {
    const res = await axiosInstance.post('/comments', data)
    return res.data
  },
}