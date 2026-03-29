import { ExitText } from '../ExitText/ExitText'
import { Logotip } from '../Logotip/Logotip'
import S from './LoginHeader.module.css'

export const LoginHeader = () => {
  return (
    <header className={S.header__container}>
      <Logotip/>      
      <ExitText/>
    </header>
  )
}
