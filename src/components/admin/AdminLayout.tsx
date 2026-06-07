import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined, ProjectOutlined, HistoryOutlined,
  CodeOutlined, SafetyCertificateOutlined, StarOutlined,
  UserOutlined, FileTextOutlined, ReadOutlined, LogoutOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../store'
import { logout } from '../../store/slices/authSlice'

const { Sider, Header, Content } = Layout

const menuItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/admin/about', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
  { key: '/admin/projects', icon: <ProjectOutlined />, label: 'Dự án' },
  { key: '/admin/experience', icon: <HistoryOutlined />, label: 'Kinh nghiệm' },
  { key: '/admin/skills', icon: <CodeOutlined />, label: 'Kỹ năng' },
  { key: '/admin/certifications', icon: <SafetyCertificateOutlined />, label: 'Chứng chỉ' },
  { key: '/admin/reviews', icon: <StarOutlined />, label: 'Đánh giá' },
  { key: '/admin/posts', icon: <FileTextOutlined />, label: 'Bài viết Blog' },
  { key: '/blog', icon: <ReadOutlined />, label: 'Blog' },
]

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((s: RootState) => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const dropdownItems = [
    { key: 'portfolio', label: 'Xem Portfolio', onClick: () => navigate('/portfolio') },
    { key: 'blog', label: 'Xem Blog', onClick: () => navigate('/') },
    { type: 'divider' as const },
    { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout, danger: true },
  ]

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        width={220}
        style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4 border-b border-gray-700">
          {collapsed ? (
            <span className="text-white font-bold text-lg">B</span>
          ) : (
            <span className="text-white font-bold text-lg">
              Blog<span className="text-blue-400">Admin</span>
            </span>
          )}
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="mt-2"
        />
      </Sider>

      {/* Main content */}
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin 0.2s' }}>
        {/* Header */}
        <Header className="bg-white px-6 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <Avatar icon={<UserOutlined />} src={user?.avatarUrl} />
              <span className="text-gray-700 hidden sm:block font-medium">
                {user?.displayName || user?.username}
              </span>
            </div>
          </Dropdown>
        </Header>

        {/* Content */}
        <Content className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout