import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  faUser,
  faList,
  faTableCells,
  faBurger,
  faClock,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
// import Tables from '../components/dashboard/Tables/Tables'
// import Users from '../components/dashboard/Users/Users'
// import Categories from '../components/dashboard/Categories/Categories'
// import Products from '../components/dashboard/Products/Products'
// import Shift from '../components/dashboard/Shift/Shift'
// import Calendar from '../components/dashboard/Calendar/Calendar'
// import Spinner from '../components/Spinner'
// import Icon from '../components/Icon'
import { getTables, reset } from '../features/tables/tableSlice'

function Dashboard() {
  // const [nav, setNav] = useState([
  //   { id: 1, name: 'Users', clicked: false, icon: faUser },
  //   { id: 2, name: 'Categories', clicked: false, icon: faList },
  //   { id: 3, name: 'Tables', clicked: false, icon: faTableCells },
  //   { id: 4, name: 'Products', clicked: false, icon: faBurger },
  //   { id: 5, name: 'Shift', clicked: false, icon: faClock },
  //   { id: 6, name: 'Calendar', clicked: false, icon: faCalendarDays },
  // ])
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else if (user.role !== 'admin') {
      navigate('/')
    }
  }, [user])

  // const toggleNav = (id) => {
  //   setNav(
  //     nav.map((icon) =>
  //       icon.id === id
  //         ? { ...icon, clicked: true }
  //         : { ...icon, clicked: false }
  //     )
  //   )
  // }
  // const showNav = nav.map((nav) => {
  //   return <Icon key={nav.id} icon={nav} toggle={toggleNav} />
  // })

  // const currentNav = (currNav) => {
  //   let selectedNav
  //   nav.map((n) => {
  //     if (n.name === currNav && n.clicked == true) {
  //       selectedNav = n.name
  //     }
  //   })
  //   return selectedNav
  // }

  return (
    <>
      {/* <section className="flex justify-center">
        <ul className="flex flex-row border-b border-gray-500 pb-2 space-x-5">
          {showNav}
        </ul>
      </section>
      <section className="flex justify-center pt-5">
        {currentNav('Users') && <Users />}
        {currentNav('Categories') && <Categories />}
        {currentNav('Tables') && <Tables />}
        {currentNav('Products') && <Products />}
        {currentNav('Shift') && <Shift />}
        {currentNav('Calendar') && <Calendar />}
      </section> */}
    </>
  )
}

export default Dashboard
