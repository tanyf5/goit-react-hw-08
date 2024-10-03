import css from './AppBar.module.css'
import clsx from 'clsx'
import Navigation from '../Navigation/Navigation'
import AuthNav from '../AuthNav/AuthNav.jsx'
import UserMenu from '../UserMenu/UserMenu'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const headerClassName = clsx(
    'container',
    isLoggedIn ? css.loggedIn : css.loggedOut
  )

  return (
    <header className={headerClassName}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  )
}