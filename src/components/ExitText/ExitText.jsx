import { Link } from 'react-router-dom';
import S from './ExitText.module.css';

export const ExitText = () => {
  
  return (
    <nav className={S.navbar__nav}>

        <div className={S.nav__item}>
          <Link className={S.nav__link} to="/">
            Выход
          </Link>
        </div>


    </nav>
  )
}
