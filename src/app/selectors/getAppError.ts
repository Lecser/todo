import { RootState } from '../providers/StoreProvider/config/store'

export const getAppError = (state: RootState) => state.app.error
