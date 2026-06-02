import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Avatar, Dropdown } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  ProfileOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { logout } from '../../store/slices/authSlice'

import { useTheme } from '../../hooks/useTheme'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'


const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const menuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Trang cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'create',
      icon: <EditOutlined />,
      label: 'Viết bài',
      onClick: () => navigate('/posts/create'),
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BlogApp
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Trang chủ
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate('/posts/create')}
              >
                Viết bài
              </Button>

              <Button
                type="text"
                icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              />

              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                  <Avatar icon={<UserOutlined />} src={user?.avatarUrl} />
                  <span className="text-gray-700 hidden sm:block">
                    {user?.displayName || user?.username}
                  </span>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => navigate('/login')}>Đăng nhập</Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Đăng ký
              </Button>
            </div>
          )}
        </nav>

        <button
          type="button"
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Trang chủ
          </Link>

          {isAuthenticated ? (
            <>
              <Button
                block
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  navigate('/posts/create')
                  setMobileOpen(false)
                }}
              >
                Viết bài
              </Button>

              <Button
                block
                type="text"
                icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => {
                  toggleTheme()
                  setMobileOpen(false)
                }}
              >
                {theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              </Button>

              <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-gray-50">
                <Avatar icon={<UserOutlined />} src={user?.avatarUrl} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.displayName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500">Đã đăng nhập</p>
                </div>
              </div>

              <Button
                block
                type="default"
                icon={<ProfileOutlined />}
                onClick={() => {
                  navigate('/profile')
                  setMobileOpen(false)
                }}
              >
                Trang cá nhân
              </Button>
              <Button
                block
                type="default"
                icon={<LogoutOutlined />}
                onClick={() => {
                  handleLogout()
                  setMobileOpen(false)
                }}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button
                block
                type="default"
                onClick={() => {
                  navigate('/login')
                  setMobileOpen(false)
                }}
              >
                Đăng nhập
              </Button>
              <Button
                block
                type="primary"
                onClick={() => {
                  navigate('/register')
                  setMobileOpen(false)
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header