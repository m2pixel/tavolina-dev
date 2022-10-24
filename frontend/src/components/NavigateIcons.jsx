import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

import {
  faUser,
  faList,
  faTableCells,
  faBurger,
  faClock,
  faCalendarDays,
  faHouse,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

export default function NavigateIcons({ isHome, resetToggle }) {
  const [nav, setNav] = useState([
    {
      id: 0,
      name: 'Dashboard',
      url: '',
      clicked: false,
      icon: faHouse,
    },
    { id: 1, name: 'Users', url: 'users', clicked: false, icon: faUser },
    {
      id: 2,
      name: 'Categories',
      url: 'categories',
      clicked: false,
      icon: faList,
    },
    {
      id: 3,
      name: 'Tables',
      url: 'tables',
      clicked: false,
      icon: faTableCells,
    },
    {
      id: 4,
      name: 'Products',
      url: 'products',
      clicked: false,
      icon: faBurger,
    },
    { id: 5, name: 'Shift', url: 'shift', clicked: false, icon: faClock },
    {
      id: 6,
      name: 'Reports',
      url: 'reports',
      clicked: false,
      icon: faCalendarDays,
    },
    {
      id: 7,
      name: 'Stocks',
      url: 'stocks',
      clicked: false,
      icon: faLayerGroup,
    },
  ])

  useEffect(() => {
    if (isHome) {
      setNav((prev) => prev.map((n) => ({ ...n, clicked: false })))
    }
  }, [isHome])

  const toggleNav = (id) => {
    setNav(
      nav.map((icon) =>
        icon.id === id
          ? { ...icon, clicked: true }
          : { ...icon, clicked: false }
      )
    )
  }

  const showNav = nav.map((nav) => {
    return (
      <Link
        key={nav.id}
        to={`dashboard/${nav.url}`}
        onClick={() => resetToggle()}
      >
        <Icon key={nav.id} toggle={toggleNav} icon={nav} />
      </Link>
    )
  })

  return (
    <>
      <section className="">
        <ul className="flex flex-row md:space-x-3"> {showNav}</ul>
      </section>
    </>
  )
}
