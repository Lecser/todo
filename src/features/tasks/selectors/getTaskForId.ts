import { RootState } from '../../../app/providers/StoreProvider/config/store'

export const getTaskForId = (todoId: string) => (state: RootState) =>
  state.tasks[todoId]
