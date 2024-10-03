import './App.css'
import { RiContactsBook3Fill } from 'react-icons/ri'
import { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { refreshUser } from '../redux/auth/operations'
import { selectIsRefreshing } from '../redux/auth/selectors'
import { Link } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Layout from './Layout/Layout'

const PublicRoute = lazy(() => import('./Routes/PublicRoute'))
const PrivateRoute = lazy(() => import('./Routes/PrivateRoute'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'))
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
)

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return isRefreshing ? null : (
    <div className="app">
      <Link to="/">
        <h1 className="title">
          <RiContactsBook3Fill /> Phonebook
        </h1>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}