import axiosInstance from '../api/axiosInstance'

export interface UploadResult {
  url: string
  fileName: string
  size: number
}

export const uploadService = {
  uploadImage: async (file: File): Promise<UploadResult> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axiosInstance.post<UploadResult>(
      '/upload/image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return res.data
  },

  uploadAvatar: async (file: File): Promise<UploadResult> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axiosInstance.post<UploadResult>(
      '/upload/avatar',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return res.data
  },
}