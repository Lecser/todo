import { Login } from '../../features/login/Login'
import classes from './LoginPage.module.css'

export const LoginPage = () => {
  return (
    <div className={classes.loginPage}>
      <Login />
    </div>
  )
}
