import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/auth')
    } else {
      navigate('/')
    }
  }, [navigate])

  return <Outlet />
}

export default Root
