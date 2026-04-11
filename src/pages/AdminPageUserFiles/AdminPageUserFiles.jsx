import { AdminHeader } from "../../components/AdminHeader/AdminHeader"
import { AdminFileChooser } from "../../components/AdminFileChooser/AdminFileChooser"
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
          fetch(`http://localhost:8000/uploadfileuser/${id_user}/`, options)
            .then((response) => response.json())
            .then((data) => {
              setAllUserFiles(data)       
              }
            )
        } catch (error) {
            console.error(error);
        }    
      }, [])

  return (
    <>
      <AuthContext.Provider value ={{allUserFiles, setAllUserFiles, newNameFile, setNewNameFile}}>
        <AdminHeader/>
        <AdminFileChooser/>
        <AdminFileManagement/>
      </AuthContext.Provider>

    </>
  )
}