import { Navigate } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'

import { useAppSelector } from '../../../../components/hooks/useAppSelector'
import { AppPaths } from '../AppRouter'

export const RequiredNonAuth: FC<PropsWithChildren> = props => {
  const { children } = props
  const isAuth = useAppSelector(state => state.app.isAuth)

  if (isAuth) return <Navigate to={AppPaths.app} />

  return <>{children}</>
}
