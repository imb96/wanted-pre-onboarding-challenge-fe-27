import { axiosInstance } from '../axiosInstance'

export const deleteTodo = async ({ id }: { id: string }) => {
  const token = localStorage.getItem('token')
  const response = await axiosInstance.delete(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}
