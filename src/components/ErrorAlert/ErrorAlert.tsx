import toast, { Toaster } from 'react-hot-toast'
import { FC, useEffect } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

interface ErrorAlertProps {
  errorMessage?: string
}

export const ErrorAlert: FC<ErrorAlertProps> = props => {
  const { errorMessage } = props
  const appStatus = useAppSelector(state => state.app.status)
  const notify = (message: string) => toast.error(message)
  useEffect(() => {
    if (appStatus === 'failed') errorMessage && notify(errorMessage)
  }, [appStatus])

  return <Toaster position='bottom-left' reverseOrder={false} />
}
