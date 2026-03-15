import { useNavigate} from 'react-router-dom';
import S from './ExitText.module.css';

export const ExitText = () => {
  const navigate = useNavigate()

  const handleSubmit = ()=>{    
    const user = localStorage.getItem('user_id')
    if (!user){
      return navigate('/', {replace: true})        
    }
    
    const options = {
      method: 'POST',
      headers: { 'Authorization': `Token ${localStorage.getItem('token')}` },
    };

		try {
			fetch('http://localhost:8000/logout/', options)
        .then((response) => {
          if (response.status == 200){
            navigate('/', {replace: true}) //если пользователь нажимает кнопку «Назад», 
                                          // он не сможет перейти на предыдущую страницу
          }          
        })
		} catch (error) {
			console.log('error: ', error);			
		}
	}
  
  return (
    <nav className={S.navbar__nav}>
        <div className={S.nav__item}>
          <div className={S.nav__link} onClick={handleSubmit}>
            Выход
          </div>
        </div>
    </nav>
  )
}
