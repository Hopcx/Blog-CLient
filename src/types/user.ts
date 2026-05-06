export interface User {
  id: string
  username: string
  email: string
  displayName?: string
  avatarUrl?: string
  role: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  displayName?: string
}