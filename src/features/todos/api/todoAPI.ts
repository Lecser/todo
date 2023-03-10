import { AxiosResponse } from 'axios'
import { instance } from '../../../axios'
import { Iresponse } from '../../../utils/model'
import { TodosResponse } from './todosModel'

export const todoAPI = {
  fetchTodos() {
    return instance.get<TodosResponse[]>(`todo-lists`)
  },
  addTodo(title: string) {
    const newTodoTitle = { title: title }
    return instance.post<
      '',
      AxiosResponse<Iresponse<{ item: TodosResponse }>>,
      { title: string }
    >('todo-lists', newTodoTitle)
  },
  removeTodo(todoId: string) {
    return instance.delete<Iresponse>(`todo-lists/${todoId}`)
  },
  updateTodoTitle(todoId: string, title: string) {
    const newTitle = {
      title: title
    }
    return instance.put(`todo-lists/${todoId}`, newTitle) // типизировать
  }
}
