import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 mt-16 py-6 text-center text-gray-500 dark:text-gray-400">
        © 2026 BlogApp
      </footer>
    </div>
  )
}

export default MainLayout