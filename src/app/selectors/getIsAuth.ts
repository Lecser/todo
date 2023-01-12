import { RootState } from '../providers/StoreProvider/config/store'

export const getIsAuth = (state: RootState) => state.auth.isAuth
