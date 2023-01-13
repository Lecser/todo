import { useEffect } from 'react'
import { useAppSelector } from '../../components/hooks/useAppSelector'
import { Todo } from './todo/Todo'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import { useActions } from '../../components/hooks/useActions'
import { todosAsyncActions } from './asyncActions'
import { getTodos } from './selectors/getTodos'
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert'

export const Todos = () => {
  const todos = useAppSelector(getTodos)

  const todosActions = useActions(todosAsyncActions)

  useEffect(() => {
    todosActions.fetchTodos()
  }, [])

  const addTodo = (title: string) => {
    todosActions.addNewTodo(title)
  }

  return (
    <>
      <ErrorAlert />
      <div
        className={
          'min-h-screen w-screen bg-gradient-to-r from-green-400 via-lime-300 to-yellow-300'
        }
      >
        <div
          className={
            'container mx-auto flex flex-wrap items-start gap-3 py-16 px-5 lg:px-0'
          }
        >
          {todos.map(el => {
            return <Todo key={el.id} title={el.title} todoId={el.id} />
          })}
          <div className={'h-8 w-44 rounded border shadow-md'}>
            <EditableSpan
              viewMode={'Button'}
              onChange={value => addTodo(value)}
            >
              Add new todo
            </EditableSpan>
          </div>
        </div>
      </div>
    </>
  )
}
