import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeProvider'
import MainLayout from './components/layout/MainLayout'
import EmptyLayout from './components/layout/EmptyLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import Portfolio from './pages/Portfolio'

import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminSkills from './pages/admin/AdminSkills'
import AdminAbout from './pages/admin/AdminAbout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<EmptyLayout />}>
                <Route path="/" element={<Portfolio />} />
              </Route>

              <Route element={<MainLayout />}>
                <Route path="/blog" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/posts/create" element={<CreatePost />} />
                  <Route path="/posts/:slug/edit" element={<EditPost />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/about" element={<AdminAbout />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/skills" element={<AdminSkills />} />
                </Route>
                </Route>

                <Route path="/posts/:slug" element={<PostDetail />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App