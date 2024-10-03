import css from './ContactList.module.css'
import clsx from 'clsx'
import Contact from '../Contact/Contact'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { selectFilteredContacts } from '../../redux/filters/selectors'
import { resetFlags } from '../../redux/contacts/slice'
import { fetchContacts } from '../../redux/contacts/operations'
import {
  selectAdded,
  selectDeleted,
  selectError,
  selectLoading,
} from '../../redux/contacts/selectors'
import Loader from '../Loader/Loader'

export default function ContactList() {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const isLoading = useSelector(selectLoading)
  const isError = useSelector(selectError)
  const isAdded = useSelector(selectAdded)
  const isDeleted = useSelector(selectDeleted)
  const filteredContacts = useSelector(selectFilteredContacts)

  const showMessage = useCallback(
    (msg) => {
      setMessage(msg)
      const timerId = setTimeout(() => {
        setMessage(null)
        dispatch(resetFlags())
      }, 1500)
      return () => clearTimeout(timerId)
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  useEffect(() => {
    isAdded && showMessage('Contact added')
    isDeleted && showMessage('Contact deleted')
  }, [isAdded, isDeleted, showMessage])

  const getMessage = () =>
    isLoading ? <Loader /> : isError ? 'Something went wrong...' : message

  const messageStyle = clsx(css.message, {
    [css.error]: isError,
    [css.added]: message === 'Contact added',
    [css.deleted]: message === 'Contact deleted',
  })

  const contactListContent =
    filteredContacts.length > 0 ? (
      filteredContacts.map((contact) => (
        <Contact key={contact.id} {...contact} />
      ))
    ) : (
      <p className={clsx(css.message, css.notFound)}>Contacts not found</p>
    )

  return (
    <div className={css.contactsWrapper}>
      {getMessage() && <p className={messageStyle}>{getMessage()}</p>}
      <ul className={css.contactList}>{contactListContent}</ul>
    </div>
  )
}