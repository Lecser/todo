import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from './config/store'
import { Toaster } from 'react-hot-toast'

export const StoreProvider: FC<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Provider store={store}>
      {children}
      <Toaster position='bottom-left' reverseOrder={false} />
    </Provider>
  )
}
