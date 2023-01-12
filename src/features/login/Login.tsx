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
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onBlur',
    resolver: yupResolver(Schema)
  })

  const onSubmit = handleSubmit(async data => {
    dispatch(await loginUser(data))
  })

  return (
    <div className={'flex min-h-screen w-screen items-center justify-center'}>
      <ErrorAlert />
      <form
        className={
          'flex h-80 w-80 flex-col items-center justify-center gap-5 rounded-2xl bg-white p-4 shadow-lg'
        }
        onSubmit={onSubmit}
      >
        <h1 className={'text-2xl font-bold'}>Sign in</h1>
        <div className={'w-full'}>
          <label className={'font-normal opacity-50'}>Email</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <TextField error={errors?.email?.message} {...field} />
            )}
          />
        </div>
        <div className={'w-full'}>
          <label className={'font-normal opacity-50'}>Password</label>
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
        <div className={'flex w-full items-center'}>
          <label className={'flex cursor-pointer items-center'}>
            <input
              {...register('rememberMe')}
              className={'mr-2 h-4 w-4 cursor-pointer'}
              type='checkbox'
            />
            <span className={'text-sm font-medium'}>Remember me</span>
          </label>
        </div>
        <button
          className={
            'flex h-8 w-28 items-center justify-center rounded-2xl bg-slate-700 text-white transition-opacity duration-500 ease-in-out hover:opacity-90'
          }
        >
          {appStatus === 'loading' ? (
            <PuffLoader color={'white'} size={'26'} />
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </div>
  )
}
