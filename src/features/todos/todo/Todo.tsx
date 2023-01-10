import { FC, useEffect } from 'react'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../components/hooks/useAppDispatch'
import { useAppSelector } from '../../../components/hooks/useAppSelector'
import { Task } from '../../task/Task'
import { addNewTask, fetchTasks } from '../../task/tasksSlice'

import classes from './Todo.module.css'
import { updateTodoTitle } from '../todoSlice'
import { Dropdown } from '../../../components/Dropdown/Dropdown'

interface TodoProps {
  title: string
  todoId: string
}

export const Todo: FC<TodoProps> = props => {
  const { title, todoId } = props
  const tasks = useAppSelector(state => state.tasks[todoId])

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasks(todoId))
  }, [dispatch])

  const onChangeTodoTitle = (newTitle: string) => {
    dispatch(updateTodoTitle({ todoId, newTitle }))
  }

  const onChangeNewTask = (title: string) => {
    dispatch(addNewTask({ todoId, title }))
  }

  return (
    <div className={classes.todoContainer}>
      <div className={classes.titleWrapper}>
        <EditableSpan
          onChange={value => onChangeTodoTitle(value)}
          viewMode={'Title'}
          spanValue={title}
        />

        <Dropdown todoId={todoId} />
      </div>
      <div draggable={true}>
        {tasks?.map(el => {
          return (
            <Task
              key={el.id}
              todoId={el.todoListId}
              title={el.title}
              taskId={el.id}
            />
          )
        })}
      </div>
      <EditableSpan
        onChange={value => onChangeNewTask(value)}
        viewMode={'Button'}
      >
        Add new Task
      </EditableSpan>
    </div>
  )
}
