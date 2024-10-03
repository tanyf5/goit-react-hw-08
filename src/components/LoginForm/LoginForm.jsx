import css from './LoginForm.module.css'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/auth/operations'
import { useSelector } from 'react-redux'
import { selectError } from '../../redux/auth/selectors'

export default function LoginForm() {
  const dispatch = useDispatch()
  const error = useSelector(selectError)

  const initialValues = {
    email: '',
    password: '',
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('invalid format')
      .max(50, 'is too long')
      .required('is required'),

    password: Yup.string().required('is required'),
  })

  const handleSubmit = (values, options) => {
    dispatch(loginUser(values))
    options.resetForm()
  }

  return (
    <div className={css.formWrapper}>
      <p className={css.formHeading}>Enter your credentials to log in</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className={css.form}>
          <div className={css.emailWrap}>
            <div className={css.mdEmail}>
              <MdEmail />
            </div>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              id="email"
              placeholder="Type your email"
            ></Field>
            <ErrorMessage
              className={css.emailError}
              name="email"
              component="span"
            />
          </div>
          <div className={css.passwordWrap}>
            <div className={css.riLockPasswordFill}>
              <RiLockPasswordFill />
            </div>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="Type your password"
            ></Field>
            <ErrorMessage
              className={css.passwordError}
              name="password"
              component="span"
            />
          </div>
          <button type="submit">Log in</button>
          {error && (
            <p className={css.requestError}>Please check your credentials...</p>
          )}
        </Form>
      </Formik>
    </div>
  )
}