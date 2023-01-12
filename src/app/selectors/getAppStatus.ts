import { RootState } from '../providers/StoreProvider/config/store'

export const getAppStatus = (state: RootState) => state.app.status
