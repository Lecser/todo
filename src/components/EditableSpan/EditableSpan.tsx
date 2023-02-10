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
import classes from './EditableSpan.module.css'

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
    if (inputValue !== spanValue) inputValue && onChange(inputValue)
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
            <h1 onClick={editMode} className={classes.title}>
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
            <div onDoubleClick={editMode} className={classes.taskWrapper}>
              <span className={'z-0 pr-1'}>
                {status === TaskStatuses.InProgress && <InProgressIcon />}
                {status === TaskStatuses.Completed && <DoneIcon />}
              </span>
              {spanValue}
            </div>
          ) : (
            <textarea
              className={classes.textArea}
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
            <div onClick={editMode} className={classes.btn}>
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
