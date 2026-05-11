import { useState, useEffect } from "react"
import { FileChooser } from "../../components/FileChooser/FileChooser"
import { FileStorage } from "../../components/FileStorage/FileStorage"
import { LoginHeader } from "../../components/LoginHeader/LoginHeader"
import { AuthContext } from "../../context/AuthContext.js"
import API_BASE_URL from '../../config'

export const UserPage = () => {
  const [allUserFiles, setAllUserFiles] = useState([])
  const [newNameFile, setNewNameFile] = useState('')
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }
    try {
      fetch(`${API_BASE_URL}/uploadfile/`, options)
        .then((response) => response.json())
        .then((data) => {
          setAllUserFiles(data)       
          }
        )
    } catch (error) {
        console.error(error);
    }
  }, [token, user_id])
 

  return (
    <AuthContext.Provider value ={{allUserFiles, setAllUserFiles, newNameFile, setNewNameFile}}>
      <LoginHeader/>
      <FileChooser/>
      <FileStorage/>
    </AuthContext.Provider>    
  )
}
