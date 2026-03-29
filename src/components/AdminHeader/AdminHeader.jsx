import { BackText } from '../BackText/BackText'
import { ExitText } from '../ExitText/ExitText'
import { Logotip } from '../Logotip/Logotip'
import S from './AdminHeader.module.css'

export const AdminHeader = () => {
  return (
    <header className={S.header__container}>
      <Logotip/>
      <div className={S.header__container__text}>
        <BackText/>
        <ExitText/>
      </div>
    </header>
  )
}
