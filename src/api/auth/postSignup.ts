import { axiosInstance } from '../axiosInstance'

export const postSignup = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await axiosInstance.post('/users/create', {
    email,
    password,
  })
  return response.data
}
