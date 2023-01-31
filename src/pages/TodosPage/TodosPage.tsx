import { Todos } from '../../features/todos/Todos'
import classes from './TodosPage.module.css'

export const TodosPage = () => {
  return (
    <div className={classes.todosPage}>
      <Todos />
    </div>
  )
}
