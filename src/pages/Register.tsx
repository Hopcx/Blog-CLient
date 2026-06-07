import { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../services/authService'
import { setCredentials } from '../store/slices/authSlice'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: {
    username: string
    email: string
    password: string
    displayName?: string
  }) => {
    setLoading(true)
    try {
      const res = await authService.register(values)
      dispatch(setCredentials({ user: res.user, token: res.token }))
      message.success('Đăng ký thành công!')
      navigate('/')
    } catch {
      message.error('Đăng ký thất bại. Email có thể đã tồn tại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-md dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Đăng ký tài khoản
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input placeholder="username" size="large" />
          </Form.Item>

          <Form.Item
            label="Tên hiển thị"
            name="displayName"
          >
            <Input placeholder="Nguyễn Văn A" size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="example@email.com" size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
            ]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Đăng ký
          </Button>
        </Form>

        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 font-medium dark:text-sky-300">
            Đăng nhập
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Register