import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

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
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow-md bg-white border-b border-gray-200'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Link to='/' className="flex items-center space-x-2">
              <Logo width='50px' />
              <span className="text-xl font-bold text-gray-800">BlogSpace</span>
            </Link>
          </div>

          <ul className='flex items-center gap-x-6'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 duration-200 font-medium text-gray-700 rounded-lg 
                    hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-gray-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header