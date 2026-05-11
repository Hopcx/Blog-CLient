import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute