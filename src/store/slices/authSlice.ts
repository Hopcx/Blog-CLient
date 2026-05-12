import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../../types/user'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// ← Fix: parse an toàn, không crash khi null/undefined
const parseUser = (): User | null => {
  try {
    const raw = localStorage.getItem('user')
    if (!raw || raw === 'undefined' || raw === 'null') return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

const parseToken = (): string | null => {
  try {
    const token = localStorage.getItem('token')
    if (!token || token === 'undefined' || token === 'null') return null
    return token
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user: parseUser(),
  token: parseToken(),
  isAuthenticated: !!parseToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer