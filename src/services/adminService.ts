import axiosInstance from '../api/axiosInstance'
import {
  type ProjectDto, type ExperienceDto,
  type SkillDto, type AboutInfoDto
} from '../types/portfolio'

// ===== ABOUT =====
export const adminAboutService = {
  update: async (data: Omit<AboutInfoDto, 'id'>): Promise<AboutInfoDto> => {
    const res = await axiosInstance.put('/portfolio/about', data)
    return res.data
  }
}

// ===== PROJECTS =====
export const adminProjectService = {
  create: async (data: Omit<ProjectDto, 'id'>): Promise<ProjectDto> => {
    const res = await axiosInstance.post('/portfolio/projects', data)
    return res.data
  },
  update: async (id: string, data: Omit<ProjectDto, 'id'>): Promise<ProjectDto> => {
    const res = await axiosInstance.put(`/portfolio/projects/${id}`, data)
    return res.data
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/portfolio/projects/${id}`)
  }
}

// ===== EXPERIENCES =====
export const adminExperienceService = {
  create: async (data: Omit<ExperienceDto, 'id'>): Promise<ExperienceDto> => {
    const res = await axiosInstance.post('/portfolio/experiences', data)
    return res.data
  },
  update: async (id: string, data: Omit<ExperienceDto, 'id'>): Promise<ExperienceDto> => {
    const res = await axiosInstance.put(`/portfolio/experiences/${id}`, data)
    return res.data
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/portfolio/experiences/${id}`)
  }
}

// ===== SKILLS =====
export const adminSkillService = {
  create: async (data: Omit<SkillDto, 'id'>): Promise<SkillDto> => {
    const res = await axiosInstance.post('/portfolio/skills', data)
    return res.data
  },
  update: async (id: string, data: Omit<SkillDto, 'id'>): Promise<SkillDto> => {
    const res = await axiosInstance.put(`/portfolio/skills/${id}`, data)
    return res.data
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/portfolio/skills/${id}`)
  }
}