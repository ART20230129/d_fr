import S from './NavBar.module.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className={S.navbar__nav}>

        <div className={S.nav__item}>
          <Link className={S.nav__link} to="/login"
          >Вход</Link>
        </div>
        <div className={S.nav__item}>
          <Link className={S.nav__link} to="/register"
          >Регистрация</Link>
        </div>

    </nav>
  )
}
