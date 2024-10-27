import { axiosInstance } from '../axiosInstance'

export const getTodos = async () => {
  const token = localStorage.getItem('token')
  const response = await axiosInstance.get('/todos', {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}
