import S from './LoginForm.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorModal } from "../../components/ErrorModal/ErrorModal.jsx"

export const LoginForm = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const { login, password } = form;

  const openModal = () => {
    setShowModal(true)        
  }

  const closeModal = () => { // закрываем модальное окно 
    setShowModal(false) 
  }

  const submitPostRequest =  (loginPasswordContent)=>{
		const options = {
			method: 'POST',
  		headers: { 'Content-Type': 'application/json' },
 			body: JSON.stringify(loginPasswordContent)
		};

		try {
			const result = fetch('http://localhost:8000/login/', options)
        .then((response) => {
          response.json().then(function(data) {  
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('token', data.token); 
            localStorage.setItem('is_staff', data.is_staff)   
            if (response.status == 200 && data.is_staff == true){//какую страницу открыть админа или юзера
              return navigate('/admin', {replace: true})
            }
            else if(response.status == 200 && data.is_staff == false){  
              return navigate('/user', {replace: true})
            }
            else {
              openModal()
            }
            
            // if (response.status == 500) {
            //   return setShowModal(true)
            // }
          });           
        })     
		} catch (error) {
			console.log('error: ', error);			
		}   
	}  

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginPasswordContent = {
      "username": form.login,
      "password": form.password
    };   
    submitPostRequest(loginPasswordContent);    
    setForm({
      login: '',
      password: '',
    });      
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setForm((prevForm)=> ({
      ...prevForm, [name]: value
    }));
  };

  return (
    <div className={S.login__form}>
      <p className={S.login__title}>Авторизация</p>
      <form className={S.form__form} autoComplete='off' onSubmit={handleSubmit}>
        <label htmlFor="login">Логин</label>
        <input 
          type="text" 
          id="login"
          name="login"
          value={login}  
          onChange={handleChange}   
          required   
        />

        <label htmlFor="password">Пароль</label>
        <input 
          type="text" 
          id="password"
          name="password"
          value={password}
          onChange={handleChange}   
          required      
        />
        <button className={S.form__button} 
          type='submit'
          disabled={!login || !password}      
        >Отправить</button>

      </form>
      <ErrorModal active={showModal} onClose={closeModal}/>
    </div>
  )
}
