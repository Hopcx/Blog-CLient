import { Link, useNavigate } from 'react-router-dom'
import { Button, Avatar, Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { logout } from '../../store/slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const menuItems = [
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

        <nav className="flex items-center gap-4">
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

              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar icon={<UserOutlined />} src={user?.avatarUrl} />
                  <span className="text-gray-700">
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
      </div>
    </header>
  )
}

export default Header