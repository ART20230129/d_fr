import S from './AdminBoard.module.css'
import { useContext, useEffect, useState } from 'react'

export const AdminBoard = () => {
  const [allUser, setAllUser] = useState([])


  return (
    <>
      <div className={S.admin_page}>
        <table>
          <caption>Список пользователей хранилица MyCloud</caption>
          <thead>
            <tr>
              <th className={S.admin_page_id}>ID</th>
              <th>Логин</th>
              <th>E-mail</th>
              <th className={S.admin_page_size}>Количество файлов</th>
              <th className={S.admin_page_size}>Размер файлов</th>
              <th className={S.admin_page_status}>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>

        </table>

      </div>
    </>
  )
}
