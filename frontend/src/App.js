import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userPermission, reset } from './features/users/userSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Table from './pages/Table'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Tables from './components/dashboard/Tables/Tables'
import EditTable from './components/dashboard/Tables/EditTable'
import Users from './components/dashboard/Users/Users'
import EditUser from './components/dashboard/Users/EditUser'
import Reports from './components/dashboard/Reports/Reports'
import Categories from './components/dashboard/Categories/Categories'
import EditCategory from './components/dashboard/Categories/EditCategory'
import Products from './components/dashboard/Products/Products'
import EditProduct from './components/dashboard/Products/EditProduct'
import Shift from './components/dashboard/Shift/Shift'
import Stock from './components/dashboard/Stocks/Stocks'
import NotFound from './pages/NotFound'
import Access from './pages/Access'
import { useEffect, useState } from 'react'

function App() {
  const [hasPermission, setHasPermission] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users)
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth.user !== null) {
      dispatch(userPermission(auth.user._id))
      setIsLogedIn((prev) => true)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, auth])

  useEffect(() => {
    if (user.permission) {
      setHasPermission((prev) => true)
    }
  }, [user, dispatch])

  const dropPermission = () => {
    setHasPermission((prev) => false)
  }

  const routes = () => {
    if (!isLogedIn) {
      return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Access />} />
          </Routes>
        </Router>
      )
    }

    if (!hasPermission) {
      return (
        <Router>
          <Header permission={hasPermission} dropPermission={dropPermission} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/table/:id"
              element={<Table permission={hasPermission} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )
    }

    if (isLogedIn && hasPermission) {
      return (
        <Router>
          <Header permission={hasPermission} dropPermission={dropPermission} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/table/:id"
              element={<Table permission={hasPermission} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="dashboard/users" element={<Users />} />
            <Route path="dashboard/users/:id" element={<EditUser />} />
            <Route path="dashboard/tables" element={<Tables />} />
            <Route path="dashboard/table/:id" element={<EditTable />} />
            <Route path="dashboard/reports" element={<Reports />} />
            <Route path="dashboard/categories" element={<Categories />} />
            <Route path="dashboard/category/:id" element={<EditCategory />} />
            <Route path="dashboard/products" element={<Products />} />
            <Route path="dashboard/product/:id" element={<EditProduct />} />
            <Route path="dashboard/stocks" element={<Stock />} />
            <Route path="dashboard/shift" element={<Shift />} />
            <Route path="/error/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/error/401" element={<Access />} />
          </Routes>
        </Router>
      )
    }
  }
  return (
    <>
      {routes()}
      <ToastContainer />
    </>
  )
}

export default App
