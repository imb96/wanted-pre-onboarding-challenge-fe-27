import { axiosInstance } from '../axiosInstance'

export const updateTodo = async ({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}) => {
  const token = localStorage.getItem('token')
  const response = await axiosInstance.put(
    `/todos/${id}`,
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )
  return response.data
}
