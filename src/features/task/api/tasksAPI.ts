import { AxiosResponse } from 'axios'
import { instance } from '../../../axios'
import { Iresponse } from '../../login/api/authAPI'
import { TodosResponse } from '../../todos/api/todoAPI'

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

export const tasksAPI = {
  fetchTasks(todoId: string) {
    return instance.get<TasksResponse>(`todo-lists/${todoId}/tasks`)
  },
  createTask(todoId: string, title: string) {
    const newTaskTitle = {
      title: title
    }
    return instance.post<
      '',
      AxiosResponse<Iresponse<{ item: Tasks }>>,
      { title: string }
    >(`todo-lists/${todoId}/tasks`, newTaskTitle)
  },
  removeTask(todoId: string, taskId: string) {
    return instance.delete<Iresponse>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
  updateTask(
    todoId: string,
    taskId: string,
    updateData: UpdateTaskRequestPayload
  ) {
    return instance.put<
      '',
      AxiosResponse<Iresponse<{ item: Tasks }>>,
      UpdateTaskRequestPayload
    >(`todo-lists/${todoId}/tasks/${taskId}`, updateData)
  }
}
