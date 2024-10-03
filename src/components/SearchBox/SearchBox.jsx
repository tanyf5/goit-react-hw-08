import css from './SearchBox.module.css'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectNameFilter } from '../../redux/filters/selectors'
import { changeFilter } from '../../redux/filters/slice'

export default function SearchBox() {
  const currentInput = useSelector(selectNameFilter)
  const dispatch = useDispatch()

  return (
    <div className={css.container}>
      <div className={css.faSearch}>
        <FaSearch />
      </div>
      <label htmlFor="searchBox">Find contacts</label>
      <input
        id="searchBox"
        type="text"
        placeholder="Search contacts"
        value={currentInput}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  )
}