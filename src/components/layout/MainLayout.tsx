import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t mt-16 py-6 text-center text-gray-500">
        © 2025 BlogApp
      </footer>
    </div>
  )
}

export default MainLayout