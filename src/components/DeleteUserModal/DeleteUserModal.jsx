import S from './DeleteUserModal.module.css'
import ReactDom from 'react-dom'

export const DeleteUserModal = ({active, onClose, onSubmit, username}) => {
    if(!active){
    return null
  }

  const portalElement = document.getElementById('root')
  
  if (portalElement) {
    return ReactDom.createPortal(
      <div>
        {/* при клике не на модальном окне оно закрывается onClick={onClose}*/}
        <div className={S.modal} onClick={onClose}> 
          {/* при клике на модальное окно оно не закрывается onClick={(e) => e.stopPropagation()}*/}
          <div className={S.modal__content} onClick={(e) => e.stopPropagation()}>          
            <div className={S.modal__header}>
              <div className={S.modal__title}>
                <p>Вы действительно хотите удалить пользователя</p>
                <p>{username} ?</p>
              </div>
            </div>
            <div className={S.modal__footer}>
              <button className={S.modal_button_delete} onClick={onSubmit}>Удалить</button>
              <button className={S.modal_button_close} onClick={onClose}>Отмена</button>
            </div>
          </div>            
        </div>
      </div>,
      portalElement
    )
  }
}
