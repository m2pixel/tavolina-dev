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
  const [isAdmin, setIsAdmin] = useState(false)
  const [resetNav, setResetNav] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') setIsAdmin((prev) => true)
    }
  }, [user])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    setIsAdmin((prev) => false)
    navigate('/login')
  }

  const resetToggle = () => {
    setResetNav((prev) => false)
  }

  return (
    <>
      {user && (
        <header className="bg-dark py-2 md:py-2 mb-10">
          <div className="container mx-auto flex flex-row justify-between text-primary">
            <div className="flex items-center md:text-4xl hover:text-secondary">
              <Link to="/">
                {/* <FaHouseUser onClick={() => setResetNav((prev) => true)} /> */}
                <img
                  src={process.env.PUBLIC_URL + '/logo.png'}
                  alt="Tavolina"
                  onClick={() => setResetNav((prev) => true)}
                />
              </Link>
            </div>
            {isAdmin && (
              <NavigateIcons resetNav={resetNav} resetToggle={resetToggle} />
            )}
            <ul className="flex items-center space-x-3 ">
              <li className="font-bold text-xl md:text-4xl hover:text-secondary">
                <FaSignOutAlt onClick={onLogout} />
              </li>
            </ul>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
