import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../contexts/theme'
import { Moon, Sun } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const {themeMode, lightTheme, darkTheme} = useTheme()

  const toggleTheme = () => {
      if(themeMode === "light") {
          darkTheme()
      } else {
          lightTheme()
      }
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-4 sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-6'>
            <Link to='/' className='flex items-center transition-transform hover:scale-105'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto items-center space-x-2'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-5 py-2 duration-300 transform font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-full transition-all'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className='ml-4'>
                <LogoutBtn />
              </li>
            )}
            <li className='ml-4 pl-4 border-l border-slate-200 dark:border-slate-700'>
              <button
                onClick={toggleTheme}
                className='flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300'
              >
                {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </li>
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header