import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Table />} />
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
          <Route path="dashboard/shift" element={<Shift />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
