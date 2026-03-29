import { AdminHeader } from "../../components/AdminHeader/AdminHeader"
import { FileChooser } from "../../components/FileChooser/FileChooser"
import { AdminFileManagement } from "../../components/AdminFileManagement/AdminFileManagement"
import { AuthContext } from "../../context/AuthContext.js"
import { useState, useEffect } from "react"

export const AdminPageUserFiles = () => {
    const [allUserFiles, setAllUserFiles] = useState([])
    const [newNameFile, setNewNameFile] = useState('')
    const token = localStorage.getItem('token');
    const id_user = localStorage.getItem('selected_user');

      useEffect(() => {
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
    
      }, [token, id_user])

  return (
    <>
      <AuthContext.Provider value ={{allUserFiles, setAllUserFiles, newNameFile, setNewNameFile}}>
        <AdminHeader/>
        <FileChooser/>
        <AdminFileManagement/>
      </AuthContext.Provider>

    </>
  )
}