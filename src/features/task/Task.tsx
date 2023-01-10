import { FC } from 'react'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import classes from '../../components/EditableSpan/EditableSpan.module.css'
import { ReactComponent as TrashIcon } from '../../assets/Trash.svg'
import { useAppDispatch } from '../../components/hooks/useAppDispatch'
import { removeTask, updateTaskTitle } from './tasksSlice'

interface TaskProps {
  title: string
  taskId: string
  todoId: string
}

export const Task: FC<TaskProps> = props => {
  const { title, todoId, taskId } = props
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTask({ todoId, taskId }))
  }
  const updateTaskTitleHandler = (taskTitle: string) => {
    dispatch(updateTaskTitle({ todoId, taskId, model: { title: taskTitle } }))
  }

  return (
    <EditableSpan
      onChange={value => updateTaskTitleHandler(value)}
      viewMode={'Task'}
      spanValue={title}
    >
      <span onClick={removeTaskHandler} className={classes.trashIcon}>
        <TrashIcon className={'h-5 w-5'} />
      </span>
    </EditableSpan>
  )
}
