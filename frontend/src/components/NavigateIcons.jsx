import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

import {
  faUser,
  faList,
  faTableCells,
  faBurger,
  faClock,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'

export default function NavigateIcons() {
  const [nav, setNav] = useState([
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
      name: 'Calendar',
      url: 'calendar',
      clicked: false,
      icon: faCalendarDays,
    },
  ])

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
      <Link key={nav.id} to={`dashboard/${nav.url}`}>
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
