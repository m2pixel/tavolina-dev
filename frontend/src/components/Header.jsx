import { FaSignOutAlt } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import NavigateIcons from './NavigateIcons'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const [resetNav, setResetNav] = useState(false)

  const onLogout = () => {
    navigate('/login')
    dispatch(logout())
    dispatch(reset())
  }

  const resetToggle = () => {
    setResetNav((prev) => false)
  }

  return (
    <>
      {user && (
        <header className="bg-dark py-2 md:py-2 md:mb-10">
          <div className="container px-5 md:mx-auto flex flex-row justify-between text-primary">
            <div className="flex items-center md:text-4xl hover:text-secondary">
              <Link to="/">
                <div
                  className="w-8 h-6 md:w-16 md:h-12 bg-cover bg-headerLogoSM md:bg-headerLogo"
                  onClick={() => setResetNav((prev) => true)}
                ></div>
              </Link>
            </div>
            {user.permission && (
              <NavigateIcons resetNav={resetNav} resetToggle={resetToggle} />
            )}
            <div className="flex items-center space-x-3 ">
              {/* <div className="invisible md:visible md:bg-primary md:bg-opacity-30 rounded md:px-10">
                <p className="py-1 text-xl">{user.name}</p>
              </div> */}
              <div className="font-bold text-xl md:text-4xl hover:text-secondary">
                <FaSignOutAlt onClick={onLogout} />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
