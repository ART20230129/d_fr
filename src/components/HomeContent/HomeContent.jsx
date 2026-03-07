import { useEffect } from 'react'
import S from './HomeContent.module.css'



export const HomeContent = () => {
  useEffect(()=>{
    localStorage.clear()
  }, [])

  return (
    <div className={S.home__content}>
      <div className={S.items}>
        <h1>MyCloud</h1>
        <p>Облачное хранилище</p>
        <p>Приложение позволяет пользователям отображать, загружать, отправлять, скачивать и переименовывать файлы</p>
      </div>
    
    
    </div>
  )
}
