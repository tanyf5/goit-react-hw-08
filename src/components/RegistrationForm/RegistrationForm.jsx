import css from './RegistrationForm.module.css'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/auth/operations'

export default function RegistrationForm() {
  const dispatch = useDispatch()

  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const registrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'is too short')
      .max(50, 'is too long')
      .required('is required'),

    email: Yup.string()
      .email('invalid format')
      .max(50, 'is too long')
      .required('is required'),

    password: Yup.string()
      .min(6, 'is too short')
      .max(50, 'is too long')
      .required('is required'),
  })

  const handleSubmit = (values, options) => {
    dispatch(registerUser(values))
    options.resetForm()
  }

  return (
    <div className={css.formWrapper}>
      <p className={css.formHeading}>Enter your credentials to sign up</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className={css.form}>
          <div className={css.nameWrap}>
            <div className={css.faUser}>
              <FaUser />
            </div>
            <label htmlFor="name">Name</label>
            <Field name="name" id="name" placeholder="Type your name"></Field>

            <ErrorMessage
              className={css.usernameError}
              name="name"
              component="span"
            />
          </div>
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
          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  )
}