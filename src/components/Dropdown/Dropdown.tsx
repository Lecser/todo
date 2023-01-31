import { Menu, Transition } from '@headlessui/react'
import { ReactComponent as DotsIcon } from '../../assets/Dots.svg'
import { ReactComponent as TrashIcon } from '../../assets/Trash.svg'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'
import { FC, Fragment } from 'react'

import { useActions } from '../hooks/useActions'
import { tasksAsyncActions } from '../../features/tasks/asyncActions'
import { todosAsyncActions } from '../../features/todos/asyncActions'

import classes from './Dropdown.module.css'
import { classNames } from '../../utils/classNames'

interface DropdownProps {
  todoId: string
}

export const Dropdown: FC<DropdownProps> = props => {
  const { todoId } = props

  const tasksActions = useActions(tasksAsyncActions)
  const todosActions = useActions(todosAsyncActions)

  const onClickRemove = () => {
    todosActions.removeTodo(todoId)
  }

  const onClickAddTask = () => {
    tasksActions.addNewTask({ todoId, title: 'New task' })
  }
  const itemMode = (mode: boolean) => {
    return classNames(classes.item, {
      ['bg-neutral-100']: mode
    })
  }

  return (
    <div className={classes.dropDownContainer}>
      <Menu as={'div'}>
        <Menu.Button className={classes.btnWrapper} as={'div'}>
          <DotsIcon />
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
          <Menu.Items className={classes.itemsContainer}>
            <div>
              <Menu.Item>
                {({ active }) => (
                  <li onClick={onClickAddTask} className={itemMode(active)}>
                    <PlusIcon className={classes.icon} />
                    <span className={'ml-1.5'}>Add Task</span>
                  </li>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <li onClick={onClickRemove} className={itemMode(active)}>
                    <TrashIcon className={classes.icon} />
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
