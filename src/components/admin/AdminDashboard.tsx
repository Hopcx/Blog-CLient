import { Card, Row, Col, Statistic } from 'antd'
import {
  FileTextOutlined, ProjectOutlined,
  UserOutlined, StarOutlined
} from '@ant-design/icons'
import { usePortfolio } from '../../hooks/usePortfolio'
import { usePosts } from '../../hooks/usePosts'

const AdminDashboard = () => {
  const { data: portfolio } = usePortfolio()
  const { data: posts } = usePosts(1, 1, undefined)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng bài viết"
              value={posts?.total ?? 0}
              prefix={<FileTextOutlined className="text-blue-500" />}
              valueStyle={{ color: '#3B82F6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Dự án"
              value={portfolio?.projects.length ?? 0}
              prefix={<ProjectOutlined className="text-green-500" />}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Kỹ năng"
              value={portfolio?.skills.length ?? 0}
              prefix={<UserOutlined className="text-purple-500" />}
              valueStyle={{ color: '#8B5CF6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá"
              value={portfolio?.reviews.length ?? 0}
              prefix={<StarOutlined className="text-yellow-500" />}
              valueStyle={{ color: '#F59E0B' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: '✍️ Viết bài mới', desc: 'Tạo bài viết blog mới', link: '/posts/create' },
          { title: '🚀 Thêm dự án', desc: 'Thêm dự án vào Portfolio', link: '/admin/projects' },
          { title: '👤 Cập nhật About', desc: 'Chỉnh sửa thông tin cá nhân', link: '/admin/about' },
          { title: '🌐 Xem Blog', desc: 'Đi tới trang Blog chính', link: '/blog' },
        ].map(item => (
          <Card
            key={item.link}
            hoverable
            onClick={() => window.location.href = item.link}
            className="cursor-pointer"
          >
            <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard