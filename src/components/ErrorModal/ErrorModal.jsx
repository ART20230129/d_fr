import ReactDom from 'react-dom'
import S from './ErrorModal.module.css'

export const ErrorModal = ({active, onClose}) => {
    if(!active){
    return null
  }

  const portalElement = document.getElementById('root')
  if(portalElement){
    return ReactDom.createPortal(
      <div>
        {/* при клике не на модальном окне оно закрывается onClick={onClose}*/}
        <div className={S.modal} onClick={onClose}> 
          {/* при клике на модальное окно оно не закрывается onClick={(e) => e.stopPropagation()}*/}
          <div className={S.modal__content} onClick={(e) => e.stopPropagation()}>          
            <div className={S.modal__header}>
              <div className={S.modal__title}>
                Неверный логин или пароль
              </div>
            </div>
            <div className={S.modal__footer}>
              <button onClick={onClose}>Close</button>
            </div>
          </div>            
        </div>
      </div>,
      portalElement
    )
  }

}
