import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <nav>
        <ul className={css.appBarNav}>
          <li>
            <NavLink to='/' className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to='/contacts' className={buildLinkClass}>
                Contacts
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}