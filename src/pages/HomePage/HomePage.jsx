import { HomeContent } from '../../components/HomeContent/HomeContent'
import { StartHeader } from '../../components/StartHeader/StartHeader'
import { useEffect } from 'react'


export const HomePage = () => {
  useEffect(()=>{
    localStorage.clear()
  }, [])
  
  return (
    <>
      <StartHeader/>
      <HomeContent/>
    </>
  )
}
