import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '../services/postService'
import { type CreatePostRequest } from '../types/post'

export const usePosts = (page = 1, pageSize = 10, status?: string) => {
  return useQuery({
    queryKey: ['posts', page, pageSize, status],
    queryFn: () => postService.getPosts(page, pageSize, status),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePostRequest) => postService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}