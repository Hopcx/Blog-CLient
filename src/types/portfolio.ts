export interface AboutInfoDto {
  fullName: string
  avatarUrl?: string
  bio: string
  titleTags: string[]
  email?: string
  phone?: string
  location?: string
  githubUrl?: string
  linkedinUrl?: string
  websiteUrl?: string
  yearsExperience: number
  projectsCompleted: number
  clientsSatisfied: number
}

export interface ProjectDto {
  id: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  tags: string[]
  isFeatured: boolean
  sortOrder: number
}

export interface ExperienceDto {
  id: string
  title: string
  company: string
  companyUrl?: string
  period: string
  location?: string
  bullets: string[]
  isCurrent: boolean
  sortOrder: number
}

export interface SkillDto {
  id: string
  name: string
  iconUrl?: string
  category: string
  sortOrder: number
}

export interface CertificationDto {
  id: string
  name: string
  issuer?: string
  imageUrl?: string
  certUrl?: string
  issuedAt: string
  sortOrder: number
}

export interface ReviewDto {
  id: string
  content: string
  clientName: string
  clientTitle?: string
  clientCompany?: string
  clientAvatarUrl?: string
  rating: number
}

export interface PortfolioDto {
  about?: AboutInfoDto
  projects: ProjectDto[]
  experiences: ExperienceDto[]
  skills: SkillDto[]
  skillCategories: string[]
  certifications: CertificationDto[]
  reviews: ReviewDto[]
}