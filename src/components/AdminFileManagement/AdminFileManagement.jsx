import S from './AdminFileManagement.module.css'
import { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthContext.js"
import { EditModal } from "../../components/EditModal/EditModal.jsx"
import { LinkModal } from '../../components/LinkModal/LinkModal.jsx'


export const AdminFileManagement = () => {
  const id_user = localStorage.getItem('selected_user');  
  const selected_username = localStorage.getItem('selected_username')
  const token = localStorage.getItem('token');
  const {allUserFiles, setAllUserFiles} = useContext(AuthContext);  
  const {newNameFile, setNewNameFile} = useContext(AuthContext);

  const [selectedFileId, setSelectedFileId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showLinkModal, setShowLinlkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkFileName, setLinkFileName] = useState('')

  const getting_list_files = () =>{ //функция загрузки списка файлов пользователя
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }
    try {
      const result = fetch(`http://localhost:8000/uploadfileuser/${id_user}/`, options)
        .then((response) => response.json())
        .then((data) => {
          setAllUserFiles(data)
          }
        )
    } catch (error) {
        console.error(error);
    }
  }

  const handleShowModal = (fileName, file_id)=>{ //открываем модальное окно для переименовывания файла
    setSelectedFileId(file_id) // записываем в state id файла, который хотим переименовать
    setNewNameFile(fileName) // записываем в контекст(store) текущее имя файла, который хотим переименовать
    setShowModal(true)    
  }

  const closeModal = () =>{ // закрываем модальное окно для переименовывания файла
    setNewNameFile('') // чистим input модального окна
    setShowModal(false) //закрываем модальное окно реактирования
    setShowLinlkModal(false) //закрываем модальное окно копирования ссылки на файл
  }

  const handleDeleteFile = (id_file) =>{ //удаление выбранного файла
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }

    try {
      const result = fetch(`http://localhost:8000/deletefile/${id_file}/`, options)
        .then((response) => response.json())
        .then(() => {
          getting_list_files()   // обновляем список файлов на странице
          }
        )
    } catch (error) {
        console.error(error);
    }
    
  }

  const handleSubmit = () => { // отправка нового имени файла на сервер 
    const options = {
      method: 'PATCH',
      headers: {        
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({file_name: newNameFile})    
    }

    try {
        const result = fetch(`http://localhost:8000/renamefile/${selectedFileId}/`, options)
          .then((response) => response.json())
          .then((data) => {
            getting_list_files()
           }
          )
      } catch (error) {
        console.error(error);
      }   

    setNewNameFile('') // чистим input модального окна
    setSelectedFileId('')
    setShowModal(false)    
  }
  
  const handleDownloadFile = async(id_file, file_name) => { //загрузка файла на компьютер из сервера
    const options = {       
      method: 'GET',
      headers: {           
        // 'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
    }

    try {
      const result = await fetch(`http://localhost:8000/downloadfile/${id_file}/`, options)
        .then((response) => response.blob())
          .then((myBlob) => {
            // Создаем URL для Blob
            const url = URL.createObjectURL(myBlob);
            // Создадим временную ссылку для скачивания
            const link = document.createElement('a');
            link.href = url;
            link.download = file_name;
            // Добавляем ссылку в DOM и имитируем клик
            document.body.appendChild(link);
            link.click();
            // Удаляем ссылку из DOM
            document.body.removeChild(link);           
            // Освобождаем память после загрузки
            setTimeout(() => URL.revokeObjectURL(url), 100);
            getting_list_files()
          });

    } catch (error) {
        console.error(error);
    } 
  }

  const handleFileLink = async(id_file, fileName) => {  //получение ссылки на скачивание файла
   setLinkFileName(fileName)
    const options = {       
      method: 'GET',
      headers: {          
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
    }

    const result = await fetch(`http://localhost:8000/downloadlinkfile/${id_file}/`, options)
      .then((response) => response.json())
      .then((data) => {
        const link_url = `http://localhost:8000/downloadfilefromlink/?link=${data['link']}`
        console.log(link_url) 
        setLinkUrl(link_url) 
        setShowLinlkModal(true)   
      })    
  }

  const handleCopyLink = ()=>{    
    navigator.clipboard.writeText(linkUrl)
      .then(() => {
      console.log("Текст успешно скопирован");
      })
      .catch(err => {
      console.error("Не удалось скопировать текст: ", err);
      });

    setShowLinlkModal(false) 
  }
  
  return (
   <>
      {allUserFiles.length > 0 ? (        
      <div className={S.storage_page}>
        <table>
          <caption>Файлы пользователя {selected_username}</caption>
            <thead className={S.head_head}>
              <tr>
                <th>Имя файла</th>
                <th className={S.storage_page_comment}>Комментарий</th>
                <th>Размер (байт)</th>
                <th>Дата загрузки</th>
                <th>Дата последнего скачивания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {allUserFiles.map(file =>(
                <tr key={file.id}>
                  <td>{file.file_name}</td>
                  <td className={S.storage_page_comment}>{file.comments}</td>
                  <td>{file.size_file}</td>
                  <td>
                      {new Date(file.uploaded_at).toLocaleDateString('ru-RU',
                        {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Europe/Moscow'})
                      }
                  </td>
                  <td>
                      {file.last_download ? new Date(file.last_download).toLocaleDateString('ru-RU', 
                        {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Europe/Moscow'}) : 'Еще не скачивался'                      
                      }
                  </td>
                  <td>
                    <button className={S.image_button_delete}
                      onClick={()=> handleDeleteFile(file.id)}
                    ></button>
                    <button className={S.image_button_edit} onClick={() => handleShowModal(file.file_name, file.id)}></button>
                    <button className={S.image_button_download} onClick={()=>handleDownloadFile(file.id, file.file_name)}></button>
                    <button className={S.image_button_link} onClick={()=>handleFileLink(file.id, file.file_name)}></button>
                  </td>
                </tr>
              ))}

            </tbody>
        </table>
        <EditModal active={showModal} onClose={closeModal} onSubmit={handleSubmit}/>
        <LinkModal active={showLinkModal} link={linkUrl} 
                   fileName={linkFileName} onClose={closeModal} onCopy={handleCopyLink}/>
      </div>
      ) : (<p className={S.no_files}>Здесь будут загруженные в хранилище файлы</p>)}
    </>
    
  )
}
