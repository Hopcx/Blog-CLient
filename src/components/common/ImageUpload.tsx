import { useState } from 'react'
import { Upload, message, Spin } from 'antd'
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { uploadService } from '../../services/uploadService'

interface Props {
  value?: string
  onChange?: (url: string) => void
  type?: 'image' | 'avatar'
  placeholder?: string
}

const ImageUpload = ({
  value,
  onChange,
  type = 'image',
  placeholder = 'Upload ảnh'
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>(value || '')

  const handleUpload = async (file: File): Promise<boolean> => {
    // Validate type
    if (!file.type.startsWith('image/')) {
      message.error('Chỉ chấp nhận file ảnh!')
      return false
    }

    // Validate size
    const maxSize = type === 'avatar' ? 2 : 5
    if (file.size / 1024 / 1024 > maxSize) {
      message.error(`Ảnh phải nhỏ hơn ${maxSize}MB!`)
      return false
    }

    setLoading(true)
    try {
      // Preview local ngay lập tức
      const localUrl = URL.createObjectURL(file)
      setPreviewUrl(localUrl)

      // Upload lên server
      const result = type === 'avatar'
        ? await uploadService.uploadAvatar(file)
        : await uploadService.uploadImage(file)

      // Cập nhật URL thật từ server
      setPreviewUrl(result.url)
      onChange?.(result.url)
      message.success('Upload ảnh thành công!')
    } catch {
      setPreviewUrl('')
      message.error('Upload thất bại, thử lại!')
    } finally {
      setLoading(false)
    }

    return false // Ngăn antd tự upload
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreviewUrl('')
    onChange?.('')
  }

  // ====== Avatar style ======
  if (type === 'avatar') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Upload
          name="file"
          showUploadList={false}
          beforeUpload={handleUpload}
          accept="image/*"
        >
          <div className="relative cursor-pointer group">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover
                           border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full
                              bg-gradient-to-br from-blue-400 to-purple-500
                              flex items-center justify-center shadow-lg">
                {loading
                  ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} />
                  : <PlusOutlined style={{ color: 'white', fontSize: 24 }} />
                }
              </div>
            )}

            {/* Overlay hover */}
            {!loading && (
              <div className="absolute inset-0 rounded-full bg-black/40
                              opacity-0 group-hover:opacity-100 transition-opacity
                              flex items-center justify-center">
                <PlusOutlined style={{ color: 'white', fontSize: 20 }} />
              </div>
            )}
          </div>
        </Upload>

        <span className="text-xs text-gray-400">
          Click để đổi ảnh (tối đa 2MB)
        </span>
      </div>
    )
  }

  // ====== Post thumbnail style ======
  return (
    <div className="w-full">
      {previewUrl ? (
        /* Preview ảnh đã upload */
        <div className="relative group rounded-xl overflow-hidden border border-gray-100">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center
                            justify-center z-10">
              <Spin size="large" />
            </div>
          )}
          <img
            src={previewUrl}
            alt="thumbnail"
            className="w-full h-48 object-cover"
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0
                          group-hover:opacity-100 transition-opacity
                          flex items-center justify-center gap-3">
            <Upload
              name="file"
              showUploadList={false}
              beforeUpload={handleUpload}
              accept="image/*"
            >
              <button
                type="button"
                className="bg-white text-gray-800 px-4 py-2 rounded-lg
                           text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Đổi ảnh
              </button>
            </Upload>

            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg
                         text-sm font-medium hover:bg-red-600 transition-colors
                         flex items-center gap-1"
            >
              <DeleteOutlined /> Xoá
            </button>
          </div>
        </div>
      ) : (
        /* Vùng upload */
        <Upload
          name="file"
          showUploadList={false}
          beforeUpload={handleUpload}
          accept="image/*"
          className="w-full"
        >
          <div className="w-full h-48 border-2 border-dashed border-gray-200
                          rounded-xl flex flex-col items-center justify-center
                          cursor-pointer hover:border-blue-400 hover:bg-blue-50
                          transition-all duration-200">
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <div className="w-12 h-12 bg-blue-100 rounded-full
                                flex items-center justify-center mb-3">
                  <PlusOutlined className="text-blue-500 text-xl" />
                </div>
                <p className="text-gray-600 font-medium">{placeholder}</p>
                <p className="text-gray-400 text-xs mt-1">
                  JPG, PNG, WEBP — tối đa 5MB
                </p>
              </>
            )}
          </div>
        </Upload>
      )}
    </div>
  )
}

export default ImageUpload