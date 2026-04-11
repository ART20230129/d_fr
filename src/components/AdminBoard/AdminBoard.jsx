import S from './AdminBoard.module.css'
import { useEffect, useState } from 'react'
import { FaDatabase, FaTrash, FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { DeleteUserModal } from '../DeleteUserModal/DeleteUserModal';
import { useNavigate } from 'react-router-dom'

export const AdminBoard = () => {
  localStorage.removeItem('selected_user')
  localStorage.removeItem('selected_username')
  const navigate = useNavigate()
  const [allUser, setAllUser] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [userNameDelete, setUserNameDelete] = useState('')
  const [deletedUserId, setdeletedUserId] = useState('')
  const token = localStorage.getItem('token');

  const gettig_list_users = ()=>{
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }

    try {
      fetch('http://localhost:8000/users/', options)
        .then((response) => response.json())
        .then((data) => {
          setAllUser(data)       
          }
        )
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{
    gettig_list_users()
  }, [])
  
  const handleShowModal = (id, username) => {
    setdeletedUserId(id) 
    setUserNameDelete(username)
    setShowModal(true)    
  }

  const closeModal = () => {     
    setShowModal(false)
  }

  const handleSubmit = () => {
    setShowModal(false)
    handleDeleteUser(deletedUserId)
  } 

  const handleToggleStatus = (id, is_staff)=>{
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({is_staff: !is_staff})   
    }
    try {
        fetch(`http://localhost:8000/api/v1/users/${id}/`, options)
          .then((response) => response.json())
          .then(() => {
            gettig_list_users()
           }
          )
      } catch (error) {
        console.error(error);
      }      
  }

  const handleDeleteUser = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }
    try {
      fetch(`http://localhost:8000/api/v1/users/${id}/`, options)
        .then(() => {
          gettig_list_users()
          }
        )
    } catch (error) {
        console.error(error);
    }  
  }

  const handleListUserFiles = (id, username) => {    
    localStorage.setItem('selected_user', id);
    localStorage.setItem('selected_username', username)
    navigate('/userFiles')
  } 

  return (
    <>
      {allUser.length > 0 ?(
        <div className={S.admin_page}>
          <table>
            <caption className={S.admin_page_caption}>Список администраторов и пользователей хранилица MyCloud</caption>
            <thead className={S.head_head}>
              <tr>
                <th className={S.admin_page_id}>ID</th>
                <th>Логин</th>
                <th>E-mail</th>
                <th className={S.admin_page_size}>Количество файлов</th>
                <th className={S.admin_page_size}>Размер файлов, Мб</th>
                <th className={S.admin_page_status}>
                 <p>Статус администратора</p>
                  </th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.count_files ? user.count_files : 'Нет файлов'}</td>
                  <td>{user.size_files ? 
                      ((user.size_files / 1024/1024).toFixed(3) > 0 ? (user.size_files / 1024/1024).toFixed(3) : 
                      ('Менее 1 МБ')): 'Нет файлов'}
                  </td>
                  <td>
                    <button className={S.button_is_staff} onClick={() => handleToggleStatus(user.id, user.is_staff)}>
                      {user.is_staff == false ? (<FaToggleOff size={30} color='#f51619'/>) : (<FaToggleOn size={30} color='#38890f'/>)}
                    </button>

                  </td>
                  <td className={S.button_cell}>
                    <button className={S.button_user_files}
                            onClick={()=>handleListUserFiles(user.id, user.username)}
                            ><FaDatabase size={25} color='#085D80'/>
                    
                    </button>
                    <button className={S.button_delete} 
                            active={showModal}
                            onClick={() => handleShowModal(user.id, user.username)}
                            onClose={closeModal}><FaTrash size={25} color='#f51619'/>
                    </button>
                  </td>
                </tr> 
              ))}
            </tbody>
          </table>
          <DeleteUserModal username={userNameDelete} active={showModal} onClose={closeModal} onSubmit={handleSubmit}/>
        </div>
      ): (<p className={S.no_users}>Здесь будет список пользователей хранилища</p>)}
      
    </>
  )
}
