import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './components/Layout'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { UserPage } from './pages/UserPage/UserPage';
import { FileStorage } from './components/FileStorage/FileStorage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />  
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegistrationPage />}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/user' element={<UserPage/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
