import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../services/categoryService'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getTree,
    staleTime: 1000 * 60 * 10, // cache 10 phút
  })
}