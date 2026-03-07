import { Link } from "react-router-dom"
import S from './Logotip.module.css'
import logotip from '../../assets/icon-cloud-storage-2.png'

export const Logotip = () => {
  return (
    <Link className={S.logo__logo} to="/">
      <img src={logotip} alt="MyCloud"/>
    </Link>
  )
}
