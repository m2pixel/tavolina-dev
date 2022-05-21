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
import Users from './components/dashboard/Users/Users'
import Reports from './components/dashboard/Reports/Reports'
import Categories from './components/dashboard/Categories/Categories'
import Products from './components/dashboard/Products/Products'
import Shift from './components/dashboard/Shift/Shift'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Table />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/tables" element={<Tables />} />
          <Route path="dashboard/reports" element={<Reports />} />
          <Route path="dashboard/categories" element={<Categories />} />
          <Route path="dashboard/products" element={<Products />} />
          <Route path="dashboard/shift" element={<Shift />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
