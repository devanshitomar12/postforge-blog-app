import { useDispatch } from 'react-redux'
import { useState, useEffect} from 'react'
import authService from "./appwrite/auth"
import './App.css'
import {login, logout} from "./redux/authslice"
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/header"
import { ThemeProvider } from './contexts/theme'

function App() {
    const [loading ,setloading] =useState(true);
    const dispatch = useDispatch()
    const [themeMode, setThemeMode] = useState("light")
    
    const lightTheme = () => setThemeMode("light")
    const darkTheme = () => setThemeMode("dark")

    useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])

     useEffect(()=>{
      authService.getCurrentUser()
      .then((userdata) => {
      if (userdata) {
        dispatch(login({userdata}))
      } else {
        dispatch(logout())
      }
     })
      .finally(() => setloading(false))
  }, [dispatch])
 
    return !loading ? (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className='min-h-screen flex flex-wrap content-between bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 selection:bg-purple-200 selection:text-purple-900 font-sans transition-colors duration-300'>
        <div className='w-full block'>
          <Header />
          <main className='py-8 min-h-[70vh]'>
          <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  ) : null
}

export default App
