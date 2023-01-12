import toast from 'react-hot-toast'
import { FC, useEffect } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { getAppStatus } from '../../app/selectors/getAppStatus'
import { getAppError } from '../../app/selectors/getAppError'

export const ErrorAlert: FC = props => {
  const appStatus = useAppSelector(getAppStatus)
  const appError = useAppSelector(getAppError)
  const notify = (message: string) => toast.error(message)
  useEffect(() => {
    if (appStatus === 'failed') appError && notify(appError)
  }, [appStatus])

  return <></>
}
