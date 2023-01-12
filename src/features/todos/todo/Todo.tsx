import { FC, useEffect } from 'react'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../components/hooks/useAppDispatch'
import { useAppSelector } from '../../../components/hooks/useAppSelector'
import { Tasks } from '../../tasks/Tasks'

import classes from './Todo.module.css'

import { Dropdown } from '../../../components/Dropdown/Dropdown'
import { todosAsyncActions } from '../asyncActions'
import { tasksAsyncActions } from '../../tasks/asyncActions'
import { useActions } from '../../../components/hooks/useActions'
import { getTaskForId } from '../../tasks/selectors/getTaskForId'

interface TodoProps {
  title: string
  todoId: string
}

export const Todo: FC<TodoProps> = props => {
  const { title, todoId } = props

  const tasksActions = useActions(tasksAsyncActions)
  const todosActions = useActions(todosAsyncActions)

  const tasks = useAppSelector(getTaskForId(todoId))

  const dispatch = useAppDispatch()
  useEffect(() => {
    tasksActions.fetchTasks(todoId)
  }, [dispatch])

  const onChangeTodoTitle = (newTitle: string) => {
    todosActions.updateTodoTitle({ todoId, newTitle })
  }

  const onChangeNewTask = (title: string) => {
    tasksActions.addNewTask({ todoId, title })
  }

  return (
    <div className={classes.todoContainer}>
      <div className={classes.titleWrapper}>
        <EditableSpan
          onChange={value => onChangeTodoTitle(value)}
          viewMode={'Title'}
          spanValue={title}
        />
        <div
          className={'flex h-6 w-6 items-center rounded hover:bg-neutral-300'}
        >
          <Dropdown viewMode={'Todo'} todoId={todoId} />
        </div>
      </div>

      {tasks?.map(el => {
        return (
          <Tasks
            key={el.id}
            status={el.status}
            todoId={el.todoListId}
            title={el.title}
            taskId={el.id}
          />
        )
      })}

      <EditableSpan
        onChange={value => onChangeNewTask(value)}
        viewMode={'Button'}
      >
        Add new task
      </EditableSpan>
    </div>
  )
}
