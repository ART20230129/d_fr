
import { useState, useReducer } from 'react';
import S from './RegisterForm.module.css'
import { useNavigate } from 'react-router-dom';

const initialState = {
  errorLoginMessage: '',
  errorEmailMessage: '',
  errorPasswordMessage: '',
}

function reducer(state, action){
  switch (action.type) {
    case "loginError":
      return{ ...state, errorLoginMessage: 'Логин должен начинаться с буквы, содержать только латинские буквы и цифры, и быть длиной от 4 до 20 символов.'}
    case 'emailError':
      return{...state, errorEmailMessage: 'Неверный формат email.'}
    case 'passwordError':
      return{...state, errorPasswordMessage: 'Пароль должен содержать минимум 6 символов, одну заглавную букву, одну цифру и один специальный символ.'}
    default:
      return initialState;
  };
}

export const RegisterForm = () => {
  const formIntialState = {
    login: '',
    fullName: '',
    email: '',
    password: '',
  }
  const [form, setForm] = useState(formIntialState);
  const navigate = useNavigate()

  const {login, fullName, email, password } = form;

  const [state,  dispatch] = useReducer(reducer, initialState)

  const validateForm = ()=>{
    const userLoginRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
    const emailRegex = /^(.+)@(.+)\.(.+)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

    if(!userLoginRegex.test(form.login)){
      dispatch({type: 'loginError'})
      return "error"
    }
    
    if(!emailRegex.test(form.email)){
      dispatch({type: 'emailError'})
      return "error"
    }

    if(!passwordRegex.test(form.password)){
      dispatch({type: 'passwordError'})
      return "error"
    }    
  }

  const submitPostRequest = (validContent)=>{
		const options = {
			method: 'POST',
  		headers: { 'Content-Type': 'application/json' },
 			body: JSON.stringify(validContent)
		};

		try {
			fetch('http://localhost:8000/register/', options)
        .then((response) => {

          response.json().then(function(data) {  
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('token', data.token);            
          }); 

          if (response.status == 201){
            navigate('/user', {replace: true})
          } 
                   
          response.json().then((data) => {
          if(data.username[0] === 'A user with that username already exists.'){
            alert('Пользователь с таким логином уже существует')
          }
          })
        })

		} catch (error) {
			console.log('error: ', error);			
		}

	}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(initialState);

    const error= validateForm();

    if(error){
      console.log('err ---');
      return
    }

    const validContent = {
      "username": login,
      "last_name": fullName,
      "email": email,
      "password": password
    }
    submitPostRequest(validContent)
    
    setForm(formIntialState) //чистим форму
    
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setForm((prevForm)=> ({
      ...prevForm, [name]: value
    }));
  }
    
  return (
        <div className={S.reg__form}>
          <p className={S.reg__title}>Регистрация</p>
          <form className={S.form__form} autoComplete='off' onSubmit={handleSubmit}>
            <label htmlFor="login">Логин</label>
            {state.errorLoginMessage && <p className={S.error__message}>{state.errorLoginMessage}</p>}
            <input 
              type="text" 
              id="login"
              name="login"
              value={login}  
              onChange={handleChange}   
              required   
            />

            <label htmlFor="fullName">Полное имя</label>
            <input 
              type="text" 
              id="fullName"
              name="fullName"
              value={fullName}  
              onChange={handleChange}   
              required   
            />

            <label htmlFor="email">E-mail</label>
            {state.errorEmailMessage && <p className={S.error__message}>{state.errorEmailMessage}</p>}
            <input 
              type="email" 
              id="email"
              name="email"
              value={email}  
              onChange={handleChange}   
              required   
            />
    
            <label htmlFor="password">Пароль</label>
            {state.errorPasswordMessage && <p className={S.error__message}>{state.errorPasswordMessage}</p>}
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
            >Зарегистрироваться</button>
    
          </form>
        </div>
  )
}
