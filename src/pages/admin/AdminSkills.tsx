import { useState } from 'react'
import {
  Table, Button, Modal, Form, Input,
  InputNumber, Popconfirm, message, Space, Select
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { usePortfolio } from '../../hooks/usePortfolio'
import { adminSkillService } from '../../services/adminService'
import { type SkillDto } from '../../types/portfolio'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Mobile', 'DevOps', 'Other']

const AdminSkills = () => {
  const { data: portfolio, isLoading } = usePortfolio()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<SkillDto | null>(null)
  const [saving, setSaving] = useState(false)

  const skills = portfolio?.skills ?? []

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ sortOrder: 0 })
    setModalOpen(true)
  }

  const openEdit = (skill: SkillDto) => {
    setEditing(skill)
    form.setFieldsValue(skill)
    setModalOpen(true)
  }

  const handleSubmit = async (values: Omit<SkillDto, 'id'>) => {
    setSaving(true)
    try {
      if (editing) {
        await adminSkillService.update(editing.id, values)
        message.success('Cập nhật thành công!')
      } else {
        await adminSkillService.create(values)
        message.success('Thêm kỹ năng thành công!')
      }
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      setModalOpen(false)
    } catch {
      message.error('Có lỗi xảy ra!')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminSkillService.delete(id)
      message.success('Đã xóa!')
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    } catch {
      message.error('Xóa thất bại!')
    }
  }

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (name: string, record: SkillDto) => (
        <div className="flex items-center gap-3">
          {record.iconUrl
            ? <img src={record.iconUrl} alt={name} className="w-8 h-8 object-contain" />
            : <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">{name.charAt(0)}</div>
          }
          <span className="font-medium">{name}</span>
        </div>
      )
    },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Sort', dataIndex: 'sortOrder', width: 80 },
    {
      title: 'Thao tác',
      width: 100,
      render: (_: unknown, record: SkillDto) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Xóa kỹ năng?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Huỷ" okButtonProps={{ danger: true }}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">💻 Quản lý Kỹ năng</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Thêm kỹ năng</Button>
      </div>

      <Table dataSource={skills} columns={columns} rowKey="id" loading={isLoading} pagination={{ pageSize: 15 }} />

      <Modal
        title={editing ? 'Chỉnh sửa kỹ năng' : 'Thêm kỹ năng mới'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item label="Tên kỹ năng" name="name" rules={[{ required: true }]}>
            <Input placeholder="React, .NET, Docker..." />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select options={CATEGORIES.map(c => ({ value: c, label: c }))} placeholder="Chọn category" />
          </Form.Item>

          <Form.Item label="Icon URL" name="iconUrl">
            <Input placeholder="https://cdn.../react.svg" />
          </Form.Item>

          <Form.Item label="Sort Order" name="sortOrder">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setModalOpen(false)}>Huỷ</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {editing ? 'Lưu' : 'Thêm'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminSkills