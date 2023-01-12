import { FC, useState } from 'react'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import { tasksAsyncActions } from './asyncActions'
import { useActions } from '../../components/hooks/useActions'
import { Dropdown } from '../../components/Dropdown/Dropdown'

import classes from './Tasks.module.css'
import { TaskStatuses } from './api/tasksModel'

interface TaskProps {
  title: string
  taskId: string
  todoId: string
  status: TaskStatuses
}

export const Tasks: FC<TaskProps> = props => {
  const { title, todoId, taskId, status } = props

  const tasksActions = useActions(tasksAsyncActions)

  const updateTaskTitleHandler = (taskTitle: string) => {
    tasksActions.updateTaskTitle({
      todoId,
      taskId,
      model: { title: taskTitle }
    })
  }
  const taskStatusColorMode =
    status === TaskStatuses.New
      ? classes.task + ' ' + 'hover:bg-neutral-200'
      : status === TaskStatuses.Completed
      ? classes.task + ' ' + classes.taskDoneStatus
      : classes.task + ' ' + classes.taskInProgressStatus

  const [visible, setVisible] = useState(false)

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={taskStatusColorMode}
    >
      <EditableSpan
        onChange={value => updateTaskTitleHandler(value)}
        viewMode={'Task'}
        spanValue={title}
        status={status}
      />
      <div className={'absolute right-1 z-20 rounded hover:bg-neutral-300'}>
        {visible && (
          <Dropdown taskId={taskId} todoId={todoId} viewMode={'Task'} />
        )}
      </div>
    </div>
  )
}
