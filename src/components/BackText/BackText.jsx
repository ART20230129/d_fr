import { use } from 'react';
import S from './BackText.module.css';
import { useNavigate } from 'react-router-dom';

export const BackText = () => {
  const navigate = useNavigate()

  const handleGoBack = () =>{
    navigate(-1)    
  }

  return (
      <nav className={S.navbar__nav}>
          <div className={S.nav__item}>
            <div className={S.nav__link} onClick={handleGoBack}>
              Назад
            </div>
          </div>
      </nav>
  )
}
