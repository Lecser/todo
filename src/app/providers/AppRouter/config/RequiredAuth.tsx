import { Navigate } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'

import { useAppSelector } from '../../../../components/hooks/useAppSelector'
import { AppPaths } from '../AppRouter'
import { getIsAuth } from '../../../selectors/getIsAuth'

export const RequiredAuth: FC<PropsWithChildren> = props => {
  const { children } = props
  const isAuth = useAppSelector(getIsAuth)

  if (isAuth) return <>{children}</>

  return <Navigate to={AppPaths.loginPage} />
}
