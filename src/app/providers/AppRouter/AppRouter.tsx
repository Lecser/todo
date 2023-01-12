import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Login } from '../../../features/login/Login'
import { RequiredAuth } from './config/RequiredAuth'
import { Todos } from '../../../features/todos/Todos'
import { RequiredNonAuth } from './config/RequiredNonAuth'

export const enum AppPaths {
  'app' = '/',
  'loginPage' = '/loginPage',
  'notFoundPageRedirect' = '*'
}

const newRouter = createBrowserRouter([
  {
    path: AppPaths.app,
    element: (
      <RequiredAuth>
        <Todos />
      </RequiredAuth>
    )
  },
  {
    path: AppPaths.loginPage,
    element: (
      <RequiredNonAuth>
        <Login />
      </RequiredNonAuth>
    )
  },
  {
    path: AppPaths.notFoundPageRedirect,
    element: <Navigate to={AppPaths.loginPage} />
  }
])

export const AppRouter = () => {
  return <RouterProvider router={newRouter} />
}
