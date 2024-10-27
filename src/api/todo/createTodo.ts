import { axiosInstance } from '../axiosInstance'

export const createTodo = async ({
  title,
  content,
}: {
  title: string
  content: string
}) => {
  const token = localStorage.getItem('token')
  const response = await axiosInstance.post(
    '/todos',
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
