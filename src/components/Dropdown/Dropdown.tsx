import { Menu, Transition } from '@headlessui/react'
import { ReactComponent as DotsIcon } from '../../assets/Dots.svg'
import { ReactComponent as TrashIcon } from '../../assets/Trash.svg'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'
import { FC, Fragment } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { removeTodo } from '../../features/todos/todoSlice'
import { addNewTask } from '../../features/task/tasksSlice'

interface DropdownProps {
  todoId: string
}

export const Dropdown: FC<DropdownProps> = props => {
  const { todoId } = props

  const dispatch = useAppDispatch()

  const onClickRemove = () => {
    dispatch(removeTodo(todoId))
  }

  const onClickAddTask = () => {
    dispatch(addNewTask({ todoId, title: 'New task' }))
  }

  return (
    <div className={'flex items-center justify-center p-1.5'}>
      <Menu as={'div'} className={'relative z-10 inline-block text-right'}>
        <Menu.Button>
          <DotsIcon
            className={
              'h-6 w-6 rounded opacity-75 transition duration-200 ease-in-out hover:bg-neutral-100'
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
              'absolute w-32 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none'
            }
          >
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
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
