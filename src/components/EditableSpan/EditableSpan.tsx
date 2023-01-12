import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useState
} from 'react'
import { TextField } from '../TextField/TextField'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'

import { ReactComponent as InProgressIcon } from '../../assets/InProggesIcon.svg'
import { ReactComponent as DoneIcon } from '../../assets/DoneIcon.svg'
import { TaskStatuses } from '../../features/tasks/api/tasksModel'

interface AddItemFormProps {
  onChange: (value: string) => void
  viewMode: 'Button' | 'Title' | 'Task'
  spanValue?: string
  status?: TaskStatuses
}

export const EditableSpan: FC<PropsWithChildren<AddItemFormProps>> = props => {
  const { viewMode, spanValue, onChange, children, status } = props

  const [inputValue, setInputValue] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const editMode = () => {
    setInputMode(true)
    if (spanValue) setInputValue(spanValue)
  }
  const btnMode = () => {
    setInputMode(false)
    if (inputValue !== spanValue) onChange(inputValue)
    setInputValue('')
  }

  const onChangeInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.currentTarget.value)
  }

  const onKeyUp = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      btnMode()
    }
  }

  return (
    <>
      {viewMode === 'Title' && (
        <>
          {!inputMode ? (
            <h1
              onClick={editMode}
              className={
                'w-full break-all p-1 pl-2 font-bold hover:cursor-pointer'
              }
            >
              {spanValue}
            </h1>
          ) : (
            <TextField
              onChange={onChangeInputValue}
              value={inputValue}
              autoFocus
              onBlur={btnMode}
              onKeyUp={onKeyUp}
            />
          )}
        </>
      )}

      {viewMode === 'Task' && (
        <>
          {!inputMode ? (
            <div
              onDoubleClick={editMode}
              className={'flex w-full items-center p-1 font-medium'}
            >
              <span className={'z-0 pr-1'}>
                {status === TaskStatuses.InProgress && <InProgressIcon />}
                {status === TaskStatuses.Completed && <DoneIcon />}
              </span>
              {spanValue}
            </div>
          ) : (
            <textarea
              className={
                'z-40 w-full resize-none overflow-hidden rounded border p-1 pl-2 shadow outline-none'
              }
              onChange={onChangeInputValue}
              value={inputValue}
              autoFocus
              onBlur={btnMode}
              onKeyUp={onKeyUp}
            />
          )}
        </>
      )}

      {viewMode === 'Button' && (
        <>
          {!inputMode ? (
            <div
              onClick={editMode}
              className={
                'flex h-8 w-full items-center justify-start rounded bg-white pl-2.5 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-neutral-100'
              }
            >
              <PlusIcon className={'mr-1 h-4 w-4'} />
              {children}
            </div>
          ) : (
            <TextField
              value={inputValue}
              onChange={onChangeInputValue}
              autoFocus
              onBlur={btnMode}
              onKeyUp={onKeyUp}
            />
          )}
        </>
      )}
    </>
  )
}
