import { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Button, message, Card } from 'antd'
import { usePortfolio } from '../../hooks/usePortfolio'
import { adminAboutService } from '../../services/adminService'
import { useQueryClient } from '@tanstack/react-query'
import ImageUpload from '../../components/common/ImageUpload'

const { TextArea } = Input

const AdminAbout = () => {
  const { data: portfolio } = usePortfolio()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (portfolio?.about) {
      form.setFieldsValue({
        ...portfolio.about,
        titleTags: portfolio.about.titleTags.join(', ')
      })
    }
  }, [portfolio, form])

  const onFinish = async (values: Record<string, unknown>) => {
    setSaving(true)
    try {
      await adminAboutService.update({
        ...values,
        titleTags: String(values.titleTags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      } as Parameters<typeof adminAboutService.update>[0])

      message.success('Cập nhật thông tin thành công!')
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    } catch {
      message.error('Có lỗi xảy ra!')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 Thông tin cá nhân</h1>

      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Form.Item label="Avatar" name="avatarUrl">
            <ImageUpload
              type="avatar"
              onChange={(url) => form.setFieldValue('avatarUrl', url)}
              value={form.getFieldValue('avatarUrl')}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true }]}>
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="contact@example.com" />
            </Form.Item>
          </div>

          <Form.Item label="Bio" name="bio" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Giới thiệu bản thân..." />
          </Form.Item>

          <Form.Item label="Title Tags (phân cách dấu phẩy)" name="titleTags">
            <Input placeholder="Full Stack Developer, Mobile Developer" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Location" name="location">
              <Input placeholder="Hà Nội, Việt Nam" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="+84 xxx xxx xxx" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="GitHub URL" name="githubUrl">
              <Input placeholder="https://github.com/..." />
            </Form.Item>
            <Form.Item label="LinkedIn URL" name="linkedinUrl">
              <Input placeholder="https://linkedin.com/in/..." />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Năm kinh nghiệm" name="yearsExperience">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Số dự án" name="projectsCompleted">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Khách hàng" name="clientsSatisfied">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" loading={saving} size="large" block>
            💾 Lưu thông tin
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default AdminAbout