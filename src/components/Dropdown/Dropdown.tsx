import { Menu, Transition } from '@headlessui/react'
import { ReactComponent as DotsIcon } from '../../assets/Dots.svg'
import { ReactComponent as TrashIcon } from '../../assets/Trash.svg'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'
import { ReactComponent as DoneIcon } from '../../assets/DoneIcon.svg'
import { ReactComponent as InProgressIcon } from '../../assets/InProggesIcon.svg'
import { FC, Fragment } from 'react'

import { useActions } from '../hooks/useActions'
import { tasksAsyncActions } from '../../features/tasks/asyncActions'
import { todosAsyncActions } from '../../features/todos/asyncActions'
import { TaskStatuses } from '../../features/tasks/api/tasksModel'

interface DropdownProps {
  todoId: string
  viewMode: 'Todo' | 'Task'
  taskId?: string
}

export const Dropdown: FC<DropdownProps> = props => {
  const { todoId, viewMode, taskId } = props

  const tasksActions = useActions(tasksAsyncActions)
  const todosActions = useActions(todosAsyncActions)

  const onClickRemove = () => {
    if (viewMode === 'Todo') {
      todosActions.removeTodo(todoId)
    } else taskId && tasksActions.removeTask({ todoId, taskId })
  }

  const updateTaskStatusHandler = (taskStatus: TaskStatuses) => {
    if (taskId)
      tasksActions.updateTaskTitle({
        todoId,
        taskId,
        model: { status: taskStatus }
      })
  }

  const onClickAddTask = () => {
    tasksActions.addNewTask({ todoId, title: 'New tasks' })
  }

  return (
    <div className={'flex items-center justify-center'}>
      <Menu as={'div'} className={'relative inline-block text-right'}>
        <Menu.Button className={'cursor-pointer'} as={'div'}>
          <DotsIcon
            className={
              'h-6 w-6 rounded opacity-75 transition duration-200 ease-in-out'
            }
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className={
              'absolute z-30 w-32 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none'
            }
          >
            {viewMode === 'Task' && (
              <>
                <div>
                  <Menu.Item>
                    {({ active }) => (
                      <li
                        onClick={() =>
                          updateTaskStatusHandler(TaskStatuses.Completed)
                        }
                        className={`flex cursor-pointer select-none list-none items-center justify-start p-1.5 ${
                          active && 'bg-neutral-100'
                        }`}
                      >
                        <DoneIcon className={'h-5 w-5'} />
                        <span className={`ml-1.5`}>Done</span>
                      </li>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <li
                        onClick={() =>
                          updateTaskStatusHandler(TaskStatuses.InProgress)
                        }
                        className={`flex cursor-pointer select-none list-none items-center justify-start p-1.5 ${
                          active && 'bg-neutral-100'
                        }`}
                      >
                        <InProgressIcon className={'h-5 w-5'} />
                        <span className={`ml-1.5`}>In progress</span>
                      </li>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
            <div>
              {viewMode === 'Todo' && (
                <Menu.Item>
                  {({ active }) => (
                    <li
                      onClick={onClickAddTask}
                      className={`flex cursor-pointer select-none list-none items-center justify-start p-1.5 ${
                        active && 'bg-neutral-100'
                      }`}
                    >
                      <PlusIcon className={'h-5 w-5'} />
                      <span className={'ml-1.5'}>Add Task</span>
                    </li>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <li
                    onClick={onClickRemove}
                    className={`flex cursor-pointer select-none list-none items-center justify-start p-1.5 ${
                      active && 'bg-neutral-100'
                    }`}
                  >
                    <TrashIcon className={'h-5 w-5'} />
                    <span className={'ml-1.5'}>Delete</span>
                  </li>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
