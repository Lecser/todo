import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../app/providers/config/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
