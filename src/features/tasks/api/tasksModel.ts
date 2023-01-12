export interface TasksResponse {
  items: Tasks[]
  totalCount: number
  error: string
}

export interface Tasks {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export interface UpdateTaskRequestPayload {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

export const enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2
}
