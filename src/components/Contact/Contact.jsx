import css from './Contact.module.css'
import { FaUserNinja } from 'react-icons/fa'
import { IoIosRemoveCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contacts/operations'

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch()

  return (
    <li className={css.item}>
      <div className={css.userIcon}>
        <FaUserNinja />
      </div>
      <div className={css.container}>
        <div className={css.contact}>
          <p>{name}</p>
          <p className={css.numberText}>{number}</p>
        </div>
        <button
          className={css.button}
          type="button"
          onClick={() => dispatch(deleteContact(id))}
        >
          <IoIosRemoveCircle />
        </button>
      </div>
    </li>
  )
}