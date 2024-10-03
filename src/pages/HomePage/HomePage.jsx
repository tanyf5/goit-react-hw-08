import css from './HomePage.module.css'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'

export default function HomePage() {
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <div className={css.home}>
      {isLoggedIn ? (
        <p className={css.gradient}>
          Welcome, {user.name}! <br></br> This is your personal contact book.
        </p>
      ) : (
        <p>
          Welcome to the contact book! <br></br>To continue, please sign in to
          your account or register.
        </p>
      )}
    </div>
  )
}