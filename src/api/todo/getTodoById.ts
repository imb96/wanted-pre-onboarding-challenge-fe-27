import { axiosInstance } from '../axiosInstance'

export const getTodoById = async ({ id }: { id: string }) => {
  const token = localStorage.getItem('token')
  const response = await axiosInstance.get(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}
