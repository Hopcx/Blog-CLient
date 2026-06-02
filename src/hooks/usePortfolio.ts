import { useQuery } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'

export const usePortfolio = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: portfolioService.getPortfolio,
    staleTime: 1000 * 60 * 10, // cache 10 phút
  })
}