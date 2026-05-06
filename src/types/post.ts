export interface Author {
  id: string
  username: string
  displayName?: string
  avatarUrl?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  status: string
  thumbnailUrl?: string
  viewCount: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  author: Author
  tags: string[]
  categories: string[]
}

export interface PagedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CreatePostRequest {
  title: string
  content: string
  excerpt?: string
  thumbnailUrl?: string
  status: string
  authorId: string
  tagNames: string[]
  categoryIds: string[]
}