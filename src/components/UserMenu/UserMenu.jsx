import css from './UserMenu.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../redux/auth/selectors'
import { logoutUser } from '../../redux/auth/operations'

export default function UserMenu() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  return (
    <>
      <nav>
        <ul className={css.userMenu}>
          <li>
            <p className={css.backgroundUser}>User: {user.name}</p>
          </li>
          <li>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  )
}