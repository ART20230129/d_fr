import { useContext } from 'react'
import ReactDom from 'react-dom'
import { AuthContext } from "../../context/AuthContext.js"
import S from './EditModal.module.css'

export const EditModal = ({active, onClose, onSubmit }) => {
  const {newNameFile, setNewNameFile} = useContext(AuthContext);
  if(!active){
    return null
  }

  const handleChange = (e) => {
    setNewNameFile(e.target.value)    
  }

  const portalElement = document.getElementById('root')

  if (portalElement){
    return ReactDom.createPortal(
      <div>
          <div className={S.modal} onClick={onClose}>
            <div className={S.modal__content} onClick={(e) => e.stopPropagation()}>
              <div className={S.modal__header}>
                <div className={S.modal__title}>
                  Введите новое имя файла
                </div>
              </div>
              <div className={S.modal__body}>
                <input className={S.modal__input}
                  type="text" 
                  id="fullName"
                  name="fullName"
                  value={newNameFile}  
                  onChange={handleChange}                    
                /> 
              </div>
              <div className={S.modal__footer}>
                <button onClick={onSubmit}>Подтвердить</button>
                <button onClick={onClose}>Отмена</button>
              </div>
            </div>            
          </div>
      </div>, // запятая обязательна!!!!!
      portalElement
    )
  }
}
