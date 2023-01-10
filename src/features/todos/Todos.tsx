import { useEffect } from 'react'
import { useAppDispatch } from '../../components/hooks/useAppDispatch'
import { useAppSelector } from '../../components/hooks/useAppSelector'
import { Todo } from './todo/Todo'
import { addNewTodo, fetchTodos } from './todoSlice'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'

export const Todos = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTodo = (title: string) => {
    dispatch(addNewTodo(title))
  }

  return (
    <div
      className={
        'h-screen w-screen bg-gradient-to-r from-green-400 via-lime-300 to-yellow-300'
      }
    >
      <div
        className={
          'container mx-auto  flex flex-wrap items-start gap-3 py-16 px-16'
        }
      >
        {todos.map(el => {
          return <Todo key={el.id} title={el.title} todoId={el.id} />
        })}
        <div className={'h-8 w-44 rounded border shadow-md'}>
          <EditableSpan viewMode={'Button'} onChange={value => addTodo(value)}>
            Add new Todo
          </EditableSpan>
        </div>
      </div>
    </div>
  )
}
