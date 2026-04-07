import S from './LinkModal.module.css'
import ReactDom from 'react-dom'

export const LinkModal = ({active, link, fileName, onClose, onCopy}) => {
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
                Ссылка на файл
              </div>
              <div className={S.modal__filename}>
                {fileName}
              </div>

            </div>
            <div className={S.modal__body}>
              {link}
            </div>
            <div className={S.modal__footer}>
              <button onClick={onCopy}>Копировать</button>
              <button onClick={onClose}>Отмена</button>
            </div>
          </div>            
        </div>
      </div>,
      portalElement
    )
  }

}
