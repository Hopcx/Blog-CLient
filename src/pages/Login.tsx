import { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../services/authService'
import { setCredentials } from '../store/slices/authSlice'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      const res = await authService.login(values)
      dispatch(setCredentials({ user: res.user, token: res.token }))
      message.success('Đăng nhập thành công!')
      navigate('/')
    } catch {
      message.error('Email hoặc mật khẩu không đúng!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-md dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Đăng nhập
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="mt-2"
          >
            Đăng nhập
          </Button>
        </Form>

        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 font-medium dark:text-sky-300">
            Đăng ký ngay
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Login