import axiosInstance from '../api/axiosInstance'
import { type PortfolioDto } from '../types/portfolio'

export const portfolioService = {
  getPortfolio: async (): Promise<PortfolioDto> => {
    const res = await axiosInstance.get('/portfolio')
    return res.data
  }
}