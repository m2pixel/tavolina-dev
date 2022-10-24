import { FaSignOutAlt } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import NavigateIcons from './NavigateIcons'
import { ReactComponent as LogoSVG } from '../img/logo.svg'

const Logo = ({ logoStyle }) => {
  return (
    <div className={logoStyle}>
      <LogoSVG />
    </div>
  )
}

function Header({ permission, dropPermission }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const [isHome, setIsHome] = useState(true)

  const onLogout = () => {
    navigate('/login')
    dispatch(logout())
    dispatch(reset())
    dropPermission()
  }

  const resetToggle = () => {
    if (isHome) {
      setIsHome((prev) => false)
    }
  }

  return (
    <>
      {user && (
        <header className="bg-dark py-2 md:py-2 md:mb-10">
          <div className="container px-5 md:mx-auto flex flex-row justify-between text-primary">
            <div className="flex items-center md:text-4xl hover:text-secondary">
              <Link to="/" onClick={() => (isHome ? '' : setIsHome(true))}>
                <Logo logoStyle="w-10 md:w-16 fill-primary md:border-2 border-primary rounded md:px-2 md:py-1 hover:fill-secondary " />
              </Link>
            </div>
            {permission ? (
              <NavigateIcons isHome={isHome} resetToggle={resetToggle} />
            ) : (
              <div className="md:pt-3 pt-1 uppercase text-sm">
                Kamarieri: <span className="font-bold">{user.name}</span>
              </div>
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
