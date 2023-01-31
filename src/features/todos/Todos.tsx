import { useEffect } from 'react'
import { useAppSelector } from '../../components/hooks/useAppSelector'
import { Todo } from './todo/Todo'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import { useActions } from '../../components/hooks/useActions'
import { todosAsyncActions } from './asyncActions'
import { getTodos } from './selectors/getTodos'
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert'
import classes from './Todos.module.css'

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
      <div className={classes.todosContainer}>
        {todos.map(el => {
          return <Todo key={el.id} title={el.title} todoId={el.id} />
        })}
        <div className={classes.btnWrapper}>
          <EditableSpan viewMode={'Button'} onChange={value => addTodo(value)}>
            Add new todo
          </EditableSpan>
        </div>
      </div>
    </>
  )
}
