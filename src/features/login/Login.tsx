import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '../../components/TextField/TextField'
import { useAppDispatch } from '../../components/hooks/useAppDispatch'
import { loginUser } from './asyncActions'
import { useAppSelector } from '../../components/hooks/useAppSelector'
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert'
import { getAppStatus } from '../../app/selectors/getAppStatus'
import { PuffLoader } from 'react-spinners'
import classes from './Login.module.css'

interface IForm {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(getAppStatus)

  const Schema = yup.object({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required')
  })

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      email: 'free@samuraijs.com',
      password: 'free',
      rememberMe: true
    },
    mode: 'onBlur',
    resolver: yupResolver(Schema)
  })

  const onSubmit = handleSubmit(async data => {
    dispatch(await loginUser(data))
  })

  return (
    <>
      <ErrorAlert />
      <form className={classes.form} onSubmit={onSubmit}>
        <h1 className={classes.formTitle}>Sign in</h1>
        <div className={'w-full'}>
          <label className={classes.inputLabel}>Email</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <TextField error={errors?.email?.message} {...field} />
            )}
          />
        </div>
        <div className={'w-full'}>
          <label className={classes.inputLabel}>Password</label>
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <TextField
                showPassword
                error={errors?.password?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className={classes.checkBoxWrapper}>
          <label className={classes.checkBoxLabel}>
            <input
              {...register('rememberMe')}
              className={classes.checkBox}
              type='checkbox'
            />
            <span className={'text-sm'}>Remember me</span>
          </label>
        </div>
        <button className={classes.formBtn}>
          {appStatus === 'loading' ? (
            <PuffLoader color={'white'} size={'26'} />
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </>
  )
}
