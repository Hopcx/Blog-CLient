import { useQuery } from '@tanstack/react-query'
import { postService } from '../services/postService'

export const usePostDetail = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postService.getPostBySlug(slug),
    enabled: !!slug,
  })
}