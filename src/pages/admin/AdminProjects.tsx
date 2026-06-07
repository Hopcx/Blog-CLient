import { useState } from 'react'
import {
  Table, Button, Modal, Form, Input, Switch,
  InputNumber, Popconfirm, message, Tag, Space
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { usePortfolio } from '../../hooks/usePortfolio'
import { adminProjectService } from '../../services/adminService'
import { type ProjectDto } from '../../types/portfolio'
import ImageUpload from '../../components/common/ImageUpload'

const { TextArea } = Input

const AdminProjects = () => {
  const { data: portfolio, isLoading } = usePortfolio()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ProjectDto | null>(null)
  const [saving, setSaving] = useState(false)

  const projects = portfolio?.projects ?? []

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ isFeatured: false, sortOrder: 0, tags: '' })
    setModalOpen(true)
  }

  const openEdit = (project: ProjectDto) => {
    setEditing(project)
    form.setFieldsValue({
      ...project,
      tags: project.tags.join(', ')
    })
    setModalOpen(true)
  }

  const handleSubmit = async (values: Record<string, unknown>) => {
    setSaving(true)
    try {
      const payload = {
        ...values,
        tags: String(values.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      } as Omit<ProjectDto, 'id'>

      if (editing) {
        await adminProjectService.update(editing.id, payload)
        message.success('Cập nhật dự án thành công!')
      } else {
        await adminProjectService.create(payload)
        message.success('Thêm dự án thành công!')
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
      await adminProjectService.delete(id)
      message.success('Đã xóa dự án!')
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    } catch {
      message.error('Xóa thất bại!')
    }
  }

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'imageUrl',
      width: 80,
      render: (url: string, record: ProjectDto) => url ? (
        <img src={url} alt={record.title} className="w-12 h-12 object-cover rounded-lg" />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">🚀</div>
      )
    },
    {
      title: 'Tên dự án',
      dataIndex: 'title',
      render: (text: string, record: ProjectDto) => (
        <div>
          <p className="font-semibold">{text}</p>
          <p className="text-gray-400 text-xs line-clamp-1">{record.shortDescription}</p>
        </div>
      )
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
        </div>
      )
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      width: 100,
      render: (val: boolean) => <Tag color={val ? 'green' : 'default'}>{val ? 'Yes' : 'No'}</Tag>
    },
    {
      title: 'Sort',
      dataIndex: 'sortOrder',
      width: 70,
    },
    {
      title: 'Thao tác',
      width: 120,
      render: (_: unknown, record: ProjectDto) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
          />
          <Popconfirm
            title="Xóa dự án này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa" cancelText="Huỷ"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🚀 Quản lý Dự án</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Thêm dự án
        </Button>
      </div>

      <Table
        dataSource={projects}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal Create/Edit */}
      <Modal
        title={editing ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={640}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item label="Tên dự án" name="title" rules={[{ required: true }]}>
            <Input placeholder="BlogApp CMS..." />
          </Form.Item>

          <Form.Item label="Mô tả ngắn" name="shortDescription">
            <Input placeholder="Một dòng mô tả..." />
          </Form.Item>

          <Form.Item label="Mô tả đầy đủ" name="description" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="Chi tiết về dự án..." />
          </Form.Item>

          <Form.Item label="Ảnh thumbnail" name="imageUrl">
            <ImageUpload
              type="image"
              placeholder="Upload ảnh dự án"
              onChange={(url) => form.setFieldValue('imageUrl', url)}
              value={form.getFieldValue('imageUrl')}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Live URL" name="liveUrl">
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item label="GitHub URL" name="githubUrl">
              <Input placeholder="https://github.com/..." />
            </Form.Item>
          </div>

          <Form.Item label="Tags (phân cách dấu phẩy)" name="tags">
            <Input placeholder="React, .NET, Docker" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Sort Order" name="sortOrder">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Featured" name="isFeatured" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setModalOpen(false)}>Huỷ</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {editing ? 'Lưu thay đổi' : 'Thêm mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminProjects