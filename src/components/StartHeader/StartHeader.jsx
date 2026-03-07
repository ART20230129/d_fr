import { Logotip } from '../Logotip/Logotip'
import { NavBar } from '../NavBar/NavBar'
import S from './StartHeader.module.css'

export const StartHeader = () => {
  return (
    <header className={S.header__container}>
      <Logotip/>
      <NavBar/>
    </header>


  )
}
