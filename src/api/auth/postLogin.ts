import { axiosInstance } from '../axiosInstance'

export const postLogin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await axiosInstance.post('/users/login', {
    email,
    password,
  })
  return response.data
}
