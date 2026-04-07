import {useState,  useContext} from 'react'
import S from './FileChooser.module.css'
import { AuthContext } from "../../context/AuthContext.js"


export const FileChooser = () => { 
  const {allUserFiles, setAllUserFiles} = useContext(AuthContext);
  const token = localStorage.getItem('token')
  const user_id = localStorage.getItem('user_id')

  const[selectedFile, setSelectedFile] = useState(null)
  const[userComments, setUserComments] = useState('')

   const getting_list_files = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }    
    }
    try {
      const result = fetch('http://localhost:8000/uploadfile/', options)
        .then((response) => response.json())
        .then((data) => {
          setAllUserFiles(data)
          }
        )
    } catch (error) {
        console.error(error);
    }
  }
   
  const handleSubmit = (e) => {
    e.preventDefault();   
          
    if (selectedFile){  
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('comments', userComments); 
      formData.append('user_id', user_id)
   
      const options = {       
        method: 'POST',
        headers: {           
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: formData
      }

      try {
        const result = fetch('http://localhost:8000/uploadfile/', options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            getting_list_files()
           }
          )
      } catch (error) {
          console.error(error);
      }
      setSelectedFile(null);
      setUserComments('');                    
    }          
  }  

  const handleFileChange = (e) =>{
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);        
    }
  }

  const handleCommentsChange = (e) =>{
    setUserComments(e.target.value)
  }

  return (
    <div className={S.form__container}>
      <form className={S.form__files} autoComplete="off" onSubmit={handleSubmit}>
        <label className={S.input__file} htmlFor="formFile"></label>
         <input type="file" name="files" id="formFile" onChange={handleFileChange} /> 
        <div>
          <label className={S.text__comment}>Комментарии</label>
             <textarea 
            id="comment"
            name='userComments'
            value={userComments}
            onChange={handleCommentsChange}
          />          
        </div>
        <button className={S.button__submit} type="submit">Загрузить</button>
      </form>

    </div>
  )
}
