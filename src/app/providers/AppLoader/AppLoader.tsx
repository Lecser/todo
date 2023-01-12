import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useAppDispatch } from '../../../components/hooks/useAppDispatch'
import { authMe } from '../../appSlice'

export const AppLoader: FC<PropsWithChildren> = props => {
  const { children } = props
  const [isAppLoading, setIsAppLoading] = useState(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMe())
  }, [])

  return <>{children}</>
}
