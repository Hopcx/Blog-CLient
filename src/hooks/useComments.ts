import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentService } from '../services/commentService'
import { type AddCommentRequest } from '../types/comment'

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentService.getByPost(postId),
    enabled: !!postId,
  })
}

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AddCommentRequest) => commentService.addComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}