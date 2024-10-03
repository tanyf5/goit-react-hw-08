import css from './AuthNav.module.css'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export default function AuthNav() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active)
  }
  return (
    <nav>
      <ul className={css.authNav}>
        <li>
          <NavLink to="/login" className={buildLinkClass}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={buildLinkClass}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}