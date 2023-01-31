import { FC, useState } from 'react'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import { tasksAsyncActions } from './asyncActions'
import { useActions } from '../../components/hooks/useActions'
import { ReactComponent as DoneIcon } from '../../assets/DoneIcon.svg'
import { ReactComponent as InProgressIcon } from '../../assets/InProggesIcon.svg'
import { ReactComponent as TrashIcon } from '../../assets/Trash.svg'

import classes from './Tasks.module.css'
import { TaskStatuses } from './api/tasksModel'
import { classNames } from '../../utils/classNames'

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
  const taskStatusColorMode = classNames(classes.task, {
    [classes.taskDoneStatus]: status === TaskStatuses.Completed,
    [classes.taskInProgressStatus]: status === TaskStatuses.InProgress
  })

  const [visible, setVisible] = useState(false)

  const updateTaskStatusHandler = (taskStatus: TaskStatuses) => {
    if (taskId)
      tasksActions.updateTaskTitle({
        todoId,
        taskId,
        model: { status: taskStatus }
      })
  }

  const onClickRemove = () => {
    tasksActions.removeTask({ todoId, taskId })
  }

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
      <div className={classes.iconsWrapper}>
        {visible && (
          <>
            <DoneIcon
              onClick={() => updateTaskStatusHandler(TaskStatuses.Completed)}
              className={classes.taskIcons}
            />
            <InProgressIcon
              onClick={() => updateTaskStatusHandler(TaskStatuses.InProgress)}
              className={classes.taskIcons}
            />
            <TrashIcon onClick={onClickRemove} className={classes.taskIcons} />
          </>
        )}
      </div>
    </div>
  )
}
