import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return children
  }
  return <Navigate to="/login" />
}