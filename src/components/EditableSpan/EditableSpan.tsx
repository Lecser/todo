import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useState,
  KeyboardEvent
} from 'react'
import { TextField } from '../TextField/TextField'
import { ReactComponent as PenIcon } from '../../assets/Pen.svg'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'
import classes from './EditableSpan.module.css'

interface AddItemFormProps {
  onChange: (value: string) => void
  viewMode: 'Button' | 'Title' | 'Task'
  spanValue?: string
}

export const EditableSpan: FC<PropsWithChildren<AddItemFormProps>> = props => {
  const { viewMode, spanValue, onChange, children } = props

  const [inputValue, setInputValue] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const [taskFocus, setTaskFocus] = useState(false)
  const editMode = () => {
    setInputMode(true)
    if (spanValue) setInputValue(spanValue)
  }
  const btnMode = () => {
    setInputMode(false)
    if (inputValue !== spanValue) onChange(inputValue)
    setInputValue('')
  }

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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
              className={'w-full p-1 pl-2 font-bold hover:cursor-pointer'}
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
            <span
              onMouseEnter={() => setTaskFocus(true)}
              onMouseLeave={() => setTaskFocus(false)}
              className={classes.taskWrapper}
            >
              {spanValue}
              {taskFocus && (
                <>
                  <span className={classes.penIcon}>
                    <PenIcon onClick={editMode} className={'h-4 w-4'} />
                  </span>
                  {children}
                </>
              )}
            </span>
          ) : (
            <div className={'mb-2'}>
              <TextField
                value={inputValue}
                onChange={onChangeInputValue}
                autoFocus
                onBlur={btnMode}
                onKeyUp={onKeyUp}
              />
            </div>
          )}
        </>
      )}
      {viewMode === 'Button' && (
        <>
          {!inputMode ? (
            <div
              onClick={editMode}
              className={
                'flex h-8 w-full items-center justify-start rounded pl-2.5 hover:cursor-pointer hover:bg-neutral-100'
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
