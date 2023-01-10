import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState
} from 'react'
import { ReactComponent as Eye } from '../../assets/Eye.svg'
import { ReactComponent as SlashEye } from '../../assets/Eye-slash.svg'
import classes from './TextField.module.css'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean
  error?: string
  onEnter?: () => void
}

type TypeInput = 'text' | 'password'
export const TextField = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { showPassword, error, onChange, onEnter, ...restProps } = props
  const [typeInput, setTypeInput] = useState<TypeInput>(
    showPassword ? 'password' : 'text'
  )

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key = 'Enter')) {
      onEnter && onEnter()
    }
  }

  const toggleTypeHandler = () => {
    setTypeInput(prev => (prev === 'text' ? 'password' : 'text'))
  }
  return (
    <div className={'relative flex'}>
      <input
        className={error ? classes.textFieldError : classes.textField}
        onChange={inputValueHandler}
        onKeyUp={onEnterHandler}
        type={typeInput}
        ref={ref}
        {...restProps}
      />
      {error && <span className={classes.errorMessage}>{error}</span>}
      {showPassword ? (
        <div onClick={toggleTypeHandler}>
          {typeInput === 'password' ? (
            <Eye className={classes.showPasswordIcon} />
          ) : (
            <SlashEye className={classes.showPasswordIcon} />
          )}
        </div>
      ) : null}
    </div>
  )
})
