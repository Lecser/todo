import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useAppDispatch } from '../../../components/hooks/useAppDispatch'

import { PageLoader } from '../../../components/PageLoader/PageLoader'
import { useAppSelector } from '../../../components/hooks/useAppSelector'
import { getAppError } from '../../selectors/getAppError'
import { getIsAuth } from '../../selectors/getIsAuth'
import { authMe } from '../../../features/login/asyncActions'

export const AppLoader: FC<PropsWithChildren> = props => {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const { children } = props

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(getIsAuth)
  const error = useAppSelector(getAppError)

  useEffect(() => {
    dispatch(authMe())
  }, [])

  useEffect(() => {
    if (isAuth) {
      setIsAppLoading(false)
    }
  }, [isAuth])

  useEffect(() => {
    if (error) {
      setIsAppLoading(false)
    }
  }, [error])

  if (isAppLoading) return <PageLoader />

  return <>{children}</>
}
