import css from './ContactsPage.module.css'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactList from '../../components/ContactList/ContactList'
import SearchBox from '../../components/SearchBox/SearchBox'

export default function ContactsPage() {
  return (
    <div className={css.contacts}>
      <div className={css.contactForm}>
        <ContactForm />
        <SearchBox />
      </div>
      <ContactList />
    </div>
  )
}