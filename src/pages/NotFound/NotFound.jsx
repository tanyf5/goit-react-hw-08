import { Link } from 'react-router-dom'
import css from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={css.notFound}>
      <p className={css.notFoundMessage}>Sorry... This page does not exist</p>
      <Link className={css.goBack} to="/">
        Back to Home
      </Link>
    </div>
  )
}