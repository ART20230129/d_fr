import S from './LoginForm.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const { login, password } = form;

  const submitPostRequest = (loginPasswordContent)=>{
		const options = {
			method: 'POST',
  		headers: { 'Content-Type': 'application/json' },
 			body: JSON.stringify(loginPasswordContent)
		};

		try {
			fetch('http://localhost:8000/login/', options)
        .then((response) => {
          response.json().then(function(data) {  
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('token', data.token);            
          }); 

          if (response.status == 200){
            navigate('/user', {replace: true})
          }          
        })

		} catch (error) {
			console.log('error: ', );			
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
    </div>
  )
}
