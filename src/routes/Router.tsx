import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'

const Root = lazy(() => import('~/routes/Root'))
const MainPage = lazy(() => import('~/pages/MainPage'))
const AuthPage = lazy(() => import('~/pages/AuthPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/auth', element: <AuthPage /> },
    ],
  },
])

const Router = () => <RouterProvider router={router} />

export default Router
